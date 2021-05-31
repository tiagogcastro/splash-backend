import CreateUsersByPhoneNumberService from '@modules/users/services/CreateUsersByPhoneNumberServices';
import { Request, Response } from 'express';

import client from 'twilio';
import twilioConfig from '@config/twilio';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

class UsersPhoneController {
  async sendCode(request: Request, response: Response): Promise<Response> {
    try {
      const { phoneNumber } = request.body;

      await clientSendMessage.verify
        .services(servicesSid)
        .verifications.create({
          to: `${String(phoneNumber)}`,
          channel: 'sms',
        });

      request.user = {
        id: '',
        phoneNumber,
      };

      return response.json({ message: 'Code sent successfully!' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const { phoneNumber } = request.user;

    if (!phoneNumber) {
      return response.status(400).json({ error: 'User number is missing' });
    }

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: String(code),
      })
      .catch(error => {
        return response.status(404).json({ error });
      });

    const createUserByPhoneNumber = new CreateUsersByPhoneNumberService();

    const { user, token } = await createUserByPhoneNumber.execute({
      phoneNumber,
    });

    request.user = {
      id: user.id,
      phoneNumber: user.phoneNumber,
    };

    return response.status(201).json({ user, token });
  }

  public async validation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { code } = request.body;

    const { phoneNumber } = request.user;

    if (!phoneNumber) {
      return response.status(400).json({ error: 'User number is missing' });
    }

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: String(code),
      })
      .catch(error => {
        return response.status(404).json({ error });
      });

    const createUserByPhoneNumber = new CreateUsersByPhoneNumberService();
    const { user, token } = await createUserByPhoneNumber.execute({
      phoneNumber,
    });

    request.user = {
      id: user.id,
      phoneNumber: user.phoneNumber,
    };

    return response.status(201).json({ user, token });
  }
}

export default UsersPhoneController;
