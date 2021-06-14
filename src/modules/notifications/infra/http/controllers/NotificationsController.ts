import { Request, Response } from 'express';
import SendSmsNotificationForIosService from '@modules/notifications/services/SendSmsNotificationForIosService';
import PostgresUsersRepository from '../../../../users/infra/typeorm/repositories/PostgresUsersRepository';
import MongoNotificationsRepository from '../../typeorm/repositories/MongoNotificationsRepository';

export default class NotificationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const mongoNotificationsRepository = new MongoNotificationsRepository();
    const notifications =
      await mongoNotificationsRepository.findAllNotifications();

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
}
