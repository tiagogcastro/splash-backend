import MongoNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/MongoNotificationsRepository';
import memory from '@modules/sponsorships/in-memory';
import CreateSponsorshipCodeService from '@modules/sponsorships/services/CreateSponsorshipCodeService';
import PostgresUserBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUsersRepository from '@modules/users/infra/typeorm/repositories/PostgresUsersRepository';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '../../typeorm/repositories/PostgresSponsorshipsRepository';

export default class SponsorshipCodeController {
  async create(request: Request, response: Response): Promise<Response> {
    const sponsor_user_id = request.user.id;
    const { allow_withdrawal_balance, amount } = request.body;

    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresUserBalanceRespository = new PostgresUserBalanceRepository();
    const mongoNotificationsRepository = new MongoNotificationsRepository();
    const postgresUsersRepository = new PostgresUsersRepository();

    const sendSponsorship = new CreateSponsorshipCodeService(
      postgresUsersRepository,
      postgresUserBalanceRespository,
      postgresSponsorshipsRepository,
      mongoNotificationsRepository,
    );

    const sponsorship = await sendSponsorship.execute({
      allow_withdrawal_balance,
      sponsor_user_id,
      amount,
    });

    memory.sponsorship = {
      code: sponsorship.sponsorship_code,
    };

    return response.status(201).json(classToClass(sponsorship));
  }
}
