import PostgresUserRepository from '@modules/users/infra/typeorm/repositories/PostgresUserRepository';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import ListSponsorshipHistoryNotificationsService from '../../../services/ListSponsorshipHistoryNotificationsService';
import MongoNotificationRepository from '../../typeorm/repositories/MongoNotificationRepository';

export default class SponsorshipHistoryController {
  async index(request: Request, response: Response): Promise<Response> {
    const { sender_id } = request.params;
    const user_recipient_id = request.user.id;

    const mongoNotificationRepository = new MongoNotificationRepository();
    const postgresUserRepository = new PostgresUserRepository();

    const listSponsorshipHistoryNotifications =
      new ListSponsorshipHistoryNotificationsService(
        mongoNotificationRepository,
        postgresUserRepository,
      );

    const notifications = await listSponsorshipHistoryNotifications.execute({
      sender_id,
      user_recipient_id,
    });
    return response.status(200).json(classToClass(notifications));
  }
}
