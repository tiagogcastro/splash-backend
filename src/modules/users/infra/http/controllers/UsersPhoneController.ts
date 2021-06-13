import twilioConfig from '@config/twilio';
import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import CreateUsersByPhoneNumberService from '@modules/users/services/CreateUsersByPhoneNumberServices';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import client from 'twilio';
import PostgresSponsorBalanceRepository from '../../typeorm/repositories/PostgresSponsorBalanceRepository';
import PostgresSponsoringRepository from '../../typeorm/repositories/PostgresSponsoringRepository';
import PostgresSponsoringSponsoredCountRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredCountRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

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

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();
    const postgresSponsorBalanceRepository =
      new PostgresSponsorBalanceRepository();
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresSponsoringRepository = new PostgresSponsoringRepository();
    const postgresSponsoringSponsoredCountRepository =
      new PostgresSponsoringSponsoredCountRepository();

    const createUser = new CreateUsersByPhoneNumberService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
      postgresSponsorBalanceRepository,
      postgresSponsorshipsRepository,
      postgresSponsoringRepository,
      postgresSponsoringSponsoredCountRepository,
    );

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: `+${phone_number}`,
        code: String(verification_code),
      })
      .catch(error => {
        throw new AppError(error);
      });

    const { user, token } = await createUser.execute({
      phone_number,
      password,
      roles,
      terms,
      balance_amount,
      sponsorship_code,
    });

    request.user = {
      id: user.id,
      phone_number: user.phone_number,
    };

    return response.status(201).json({ user, token });
  }
}

export default UsersPhoneController;
