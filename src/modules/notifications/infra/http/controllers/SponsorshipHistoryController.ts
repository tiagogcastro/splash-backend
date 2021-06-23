import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListSponsorshipHistoryNotificationsService from '../../../services/ListSponsorshipHistoryNotificationsService';

export default class SponsorshipHistoryController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const user_recipient_id = request.user.id;

    const listSponsorshipHistoryNotifications = container.resolve(
      ListSponsorshipHistoryNotificationsService,
    );
    const notifications = await listSponsorshipHistoryNotifications.execute({
      user_id,
      user_recipient_id,
    });
    return response.status(200).json(classToClass(notifications));
  }
}
