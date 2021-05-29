import { Request, Response } from 'express';

import ListUsersWhoSponsorTheUser from '@modules/users/services/ListUsersWhoSponsorTheUser';

class ListSponsoringController {
  async index(request: Request, response: Response): Promise<Response> {
    const {user_id} = request.params;

    const listUsersWhoSponsorTheUser = new ListUsersWhoSponsorTheUser();

    const sponsoring = await listUsersWhoSponsorTheUser.execute(user_id);

    return response.json(sponsoring);
  }
}

export default ListSponsoringController;