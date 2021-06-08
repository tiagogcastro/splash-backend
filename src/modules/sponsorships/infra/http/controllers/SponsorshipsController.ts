import MongoNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/MongoNotificationsRepository';
import SendSponsorshipService from '@modules/sponsorships/services/SendSponsorshipService';
import PostgresSponsorBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresSponsorBalanceRepository';
import PostgresUserBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUsersRepository from '@modules/users/infra/typeorm/repositories/PostgresUsersRepository';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '../../typeorm/repositories/PostgresSponsorshipsRepository';

export default class SponsorshipsController {
  async create(request: Request, response: Response): Promise<Response> {
    const sponsor_user_id = request.user.id;
    const { user_recipient_id, allow_withdrawal_balance, amount } =
      request.body;

    const mongoNotificationsRepository = new MongoNotificationsRepository();
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresUserBalanceRespository = new PostgresUserBalanceRepository();
    const postgresSponsorBalanceRespository =
      new PostgresSponsorBalanceRepository();
    const postgresUsersRepository = new PostgresUsersRepository();

    const sendSponsorship = new SendSponsorshipService(
      postgresUsersRepository,
      postgresUserBalanceRespository,
      postgresSponsorshipsRepository,
      postgresSponsorBalanceRespository,
      mongoNotificationsRepository,
    );

    const sponsorship = await sendSponsorship.execute({
      user_recipient_id,
      sponsor_user_id,
      allow_withdrawal_balance,
      amount,
    });

    return response.status(201).json(classToClass(sponsorship));
  }
}