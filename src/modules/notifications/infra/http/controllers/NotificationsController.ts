import { Request, Response } from 'express';
import SendSmsNotificationForIosService from '@modules/notifications/services/SendSmsNotificationForIosService';
import PostgresUserRepository from '../../../../users/infra/typeorm/repositories/PostgresUserRepository';
import MongoNotificationRepository from '../../typeorm/repositories/MongoNotificationRepository';

export default class NotificationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const mongoNotificationRepository = new MongoNotificationRepository();
    const notifications =
      await mongoNotificationRepository.findAllNotifications();

    return response.status(200).json(notifications);
  }

  async sendNotificationForIos(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { message } = await request.body;

    const postgresUserRepository = new PostgresUserRepository();
    const sendSmsNotificationForIos = new SendSmsNotificationForIosService(
      postgresUserRepository,
    );

    const notifications = await sendSmsNotificationForIos.sendNotification({
      user_id,
      message,
    });

    return response.status(200).json(notifications);
  }
}
