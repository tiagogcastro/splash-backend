<<<<<<< HEAD
import twilioConfig from '@config/twilio';
import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import CreateUsersByPhoneNumberService from '@modules/users/services/CreateUsersByPhoneNumberServices';
import AppError from '@shared/errors/AppError';
=======
>>>>>>> f29517f15a56a8a9ba4b6686def4c9455814842b
import { Request, Response } from 'express';
import client from 'twilio';
<<<<<<< HEAD
import PostgresSponsorBalanceRepository from '../../typeorm/repositories/PostgresSponsorBalanceRepository';
import PostgresSponsoringRepository from '../../typeorm/repositories/PostgresSponsoringRepository';
import PostgresSponsoringSponsoredCountRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredCountRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
=======
import twilioConfig from '@config/twilio';
import AppError from '@shared/errors/AppError';
import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';
import PostgresSponsoringSponsoredRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredRepository';
import PostgresUserSponsoringSponsoredCountRepository from '../../typeorm/repositories/PostgresUserSponsoringSponsoredCountRepository';
import PostgresSponsorBalanceRepository from '../../typeorm/repositories/PostgresSponsorBalanceRepository';
>>>>>>> f29517f15a56a8a9ba4b6686def4c9455814842b

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
    const postgresSponsoringSponsoredRepository =
      new PostgresSponsoringSponsoredRepository();
    const postgresUserSponsoringSponsoredCountRepository =
      new PostgresUserSponsoringSponsoredCountRepository();

    const createUser = new CreateUserService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
      postgresSponsorBalanceRepository,
      postgresSponsorshipsRepository,
      postgresSponsoringSponsoredRepository,
      postgresUserSponsoringSponsoredCountRepository,
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
