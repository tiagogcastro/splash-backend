import MongoNotificationsRepository from '@modules/notifications/infra/repositories/MongoNotificationsRepository';
import SendSponsorshipService from '@modules/sponsors/services/SendSponsorshipService';
import { Request, Response } from 'express';
import PostgresSponsorsRepository from '../../typeorm/repositories/PostgresSponsorsRepository';

export default class CreateSponsorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_recipient_id = request.user.id;
    const { sponsor_id, allow_withdrawal, money } = request.body;

    const mongoNotificationsRepository = new MongoNotificationsRepository();
    const postgresSponsorsRepository = new PostgresSponsorsRepository();

    const sendSponsorship = new SendSponsorshipService(
      postgresSponsorsRepository,
      mongoNotificationsRepository,
    );

    const sponsor = await sendSponsorship.execute({
      user_recipient_id,
      sponsor_id,
      allow_withdrawal,
      your_sponsor_balance: money,
    });

    return response.status(201).json(sponsor);
  }
}
