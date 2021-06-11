import PostgresUsersRepository from '@modules/users/infra/typeorm/repositories/PostgresUsersRepository';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import ListSponsorshipHistoryNotificationsService from '../../../services/ListSponsorshipHistoryNotificationsService';
import MongoNotificationsRepository from '../../typeorm/repositories/MongoNotificationsRepository';

export default class SponsorshipHistoryController {
  async index(request: Request, response: Response): Promise<Response> {
    const { sender_id } = request.params;
    const user_recipient_id = request.user.id;

    const mongoNotificationsRepository = new MongoNotificationsRepository();
    const postgresUsersRepository = new PostgresUsersRepository();

    const listSponsorshipHistoryNotifications =
      new ListSponsorshipHistoryNotificationsService(
        mongoNotificationsRepository,
        postgresUsersRepository,
      );

    const notifications = await listSponsorshipHistoryNotifications.execute({
      sender_id,
      user_recipient_id,
    });
    return response.status(200).json(classToClass(notifications));
  }
}
