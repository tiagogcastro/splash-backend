import ListSponsorshipNotificationsService from '@modules/notifications/services/ListSponsorshipNotificationsService';
import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class SponsorshipNotificationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listSponsorshipNotifications = container.resolve(
      ListSponsorshipNotificationsService,
    );

    const notifications = await listSponsorshipNotifications.execute(user_id);

    return response.status(200).json(classToClass(notifications));
  }
}
