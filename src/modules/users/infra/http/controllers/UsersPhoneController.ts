import twilioConfig from '@config/twilio';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import client from 'twilio';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

class UsersPhoneController {
  async sendCode(request: Request, response: Response): Promise<Response> {
    try {
      const { phone_number } = request.body;

      await clientSendMessage.verify
        .services(servicesSid)
        .verifications.create({
          to: `+${String(phone_number)}`,
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
    const {
      verification_code,
      password,
      roles,
      balance_amount,
      terms,
      sponsorship_code,
    } = request.body;

    const { phone_number } = request.user;

    const createUser = container.resolve(CreateUserService);

    const { user, token } = await createUser.execute({
      phone_number,
      password,
      roles,
      terms,
      balance_amount,
      sponsorship_code,
    });

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: `+${phone_number}`,
        code: String(verification_code),
      })
      .catch(error => {
        throw new AppError(error);
      });

    request.user = {
      id: user.id,
      phone_number: user.phone_number,
    };

    return response.status(201).json({ user, token });
  }
}

export default UsersPhoneController;
