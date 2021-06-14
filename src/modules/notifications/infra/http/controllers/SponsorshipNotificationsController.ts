import ListSponsorshipNotificationsService from '@modules/notifications/services/ListSponsorshipNotificationsService';
import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import MongoNotificationRepository from '../../typeorm/repositories/MongoNotificationRepository';
import PostgresUserRepository from '../../../../users/infra/typeorm/repositories/PostgresUserRepository';

export default class SponsorshipNotificationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const mongoNotificationRepository = new MongoNotificationRepository();
    const postgresUserRepository = new PostgresUserRepository();

    const listSponsorshipNotifications =
      new ListSponsorshipNotificationsService(
        mongoNotificationRepository,
        postgresUserRepository,
      );

    const notifications = await listSponsorshipNotifications.execute(user_id);

    return response.status(200).json(classToClass(notifications));
  }
}
