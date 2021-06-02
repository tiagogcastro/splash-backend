import MongoNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/MongoNotificationsRepository';
import SendSponsorshipService from '@modules/sponsorships/services/SendSponsorshipService';
import PostgresUsersRepository from '@modules/users/infra/typeorm/repositories/PostgresUsersRepository';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '../../typeorm/repositories/PostgresSponsorshipsRepository';

export default class SponsorshipsController {
  async create(request: Request, response: Response): Promise<Response> {
    const sponsor_id = request.user.id;
    const { user_recipient_id, allow_withdrawal, balance_amount } =
      request.body;

    const mongoNotificationsRepository = new MongoNotificationsRepository();
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresUsersRepository = new PostgresUsersRepository();

    const sendSponsorship = new SendSponsorshipService(
      postgresUsersRepository,
      postgresSponsorshipsRepository,
      mongoNotificationsRepository,
    );

    const sponsorship = await sendSponsorship.execute({
      user_recipient_id,
      sponsor_id,
      allow_withdrawal,
      balance_amount,
    });

    return response.status(201).json(sponsorship);
  }
}
