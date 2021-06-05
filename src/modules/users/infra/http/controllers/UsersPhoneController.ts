import CreateUsersByPhoneNumberService from '@modules/users/services/CreateUsersByPhoneNumberServices';
import { Request, Response } from 'express';

import client from 'twilio';
import twilioConfig from '@config/twilio';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

class UsersPhoneController {
  async sendCode(request: Request, response: Response): Promise<Response> {
    try {
      const { phone_number } = request.body;

      await clientSendMessage.verify
        .services(servicesSid)
        .verifications.create({
          to: `${String(phone_number)}`,
          channel: 'sms',
        });

      request.user = {
        id: '',
        phone_number,
      };

      return response.json({ message: 'Code sent successfully!' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const { phone_number } = request.user;

    if (!phone_number) {
      return response.status(400).json({ error: 'User number is missing' });
    }

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: phone_number,
        code: String(code),
      })
      .catch(error => {
        return response.status(404).json({ error });
      });

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();

    const createUserByPhoneNumber = new CreateUsersByPhoneNumberService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
    );

    const { user, token } = await createUserByPhoneNumber.execute({
      phone_number,
    });

    request.user = {
      id: user.id,
      phone_number: user.phone_number,
    };

    return response.status(201).json({ user, token });
  }

  public async validation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { code } = request.body;

    const { phone_number } = request.user;

    if (!phone_number) {
      return response.status(400).json({ error: 'User number is missing' });
    }

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: phone_number,
        code: String(code),
      })
      .catch(error => {
        return response.status(404).json({ error });
      });

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();
    const createUserByPhoneNumber = new CreateUsersByPhoneNumberService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
    );
    const { user, token } = await createUserByPhoneNumber.execute({
      phone_number,
    });

    request.user = {
      id: user.id,
      phone_number: user.phone_number,
    };

    return response.status(201).json({ user, token });
  }
}

export default UsersPhoneController;
