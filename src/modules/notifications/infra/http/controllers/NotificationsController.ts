import ListGroupedSponsorshipNotificationsService from '@modules/notifications/services/ListGroupedSponsorshipNotificationsService';
import { Request, Response } from 'express';
import SendSmsNotificationForIosService from '@modules/notifications/services/SendSmsNotificationForIosService';
import SendSmsNotificationForAndroidService from '@modules/notifications/services/SendSmsNotificationForAndroidService';
import MongoNotificationsRepository from '../../typeorm/repositories/MongoNotificationsRepository';
import PostgresUsersRepository from '../../../../users/infra/typeorm/repositories/PostgresUsersRepository';

export default class NotificationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const mongoNotificationsRepository = new MongoNotificationsRepository();

    const listGroupedSponsorshipNotifications =
      new ListGroupedSponsorshipNotificationsService(
        mongoNotificationsRepository,
      );

    const notifications = await listGroupedSponsorshipNotifications.execute(
      user_id,
    );

    return response.status(200).json(notifications);
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

  async createNotificationForAndroid(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { message } = await request.body;

    const sendSmsNotificationForAndroid =
      new SendSmsNotificationForAndroidService();

    const notifications =
      await sendSmsNotificationForAndroid.createNotification({
        user_id,
        message,
      });

    return response.status(200).json(notifications);
  }
}
