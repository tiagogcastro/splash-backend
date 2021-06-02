import ListGroupedSponsorshipNotificationsService from '@modules/notifications/services/ListGroupedSponsorshipNotificationsService';
import { Request, Response } from 'express';
import MongoNotificationsRepository from '../../typeorm/repositories/MongoNotificationsRepository';

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
}
