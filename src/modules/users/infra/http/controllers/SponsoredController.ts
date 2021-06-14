import { Request, Response } from 'express';

import ListUsersSponsoredByUser from '@modules/users/services/ListUsersSponsoredByUser';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class SponsoredController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUsersSponsoredByUser = container.resolve(
      ListUsersSponsoredByUser,
    );

    const usersSponsored = await listUsersSponsoredByUser.execute(user_id);

    return response.json(classToClass(usersSponsored));
  }
}

export default SponsoredController;
