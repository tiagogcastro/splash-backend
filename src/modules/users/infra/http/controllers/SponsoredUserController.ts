import { Request, Response } from 'express';

import ListUsersSponsoredByUser from '@modules/users/services/ListUsersSponsoredByUser';

class SponsoredController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listUsersSponsoredByUser = new ListUsersSponsoredByUser();

    const sponsored = await listUsersSponsoredByUser.execute(user_id);

    return response.json(sponsored);
  }
}

export default SponsoredController;
