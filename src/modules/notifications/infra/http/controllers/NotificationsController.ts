import ListSponsorshipNotificationsService from '@modules/notifications/services/ListSponsorshipNotificationsService';
import { Request, Response } from 'express';
import SendSmsNotificationForIosService from '@modules/notifications/services/SendSmsNotificationForIosService';

import { classToClass } from 'class-transformer';
import MongoNotificationsRepository from '../../typeorm/repositories/MongoNotificationsRepository';
import PostgresUsersRepository from '../../../../users/infra/typeorm/repositories/PostgresUsersRepository';

export default class NotificationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const mongoNotificationsRepository = new MongoNotificationsRepository();
    const postgresUsersRepository = new PostgresUsersRepository();

    const listSponsorshipNotifications =
      new ListSponsorshipNotificationsService(
        mongoNotificationsRepository,
        postgresUsersRepository,
      );

    const notifications = await listSponsorshipNotifications.execute(user_id);

    return response.status(200).json(classToClass(notifications));
  }

  async sendNotificationForIos(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { message } = await request.body;

    const usersRepository = new PostgresUsersRepository();
    const sendSmsNotificationForIos = new SendSmsNotificationForIosService(
      usersRepository,
    );

    const notifications = await sendSmsNotificationForIos.sendNotification({
      user_id,
      message,
    });

    return response.status(200).json(notifications);
  }
}
