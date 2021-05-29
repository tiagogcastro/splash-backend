import { Request, Response } from 'express';

import ListUsersSponsoredByUser from '@modules/users/services/ListUsersSponsoredByUser';
import ListUsersWhoSponsorTheUser from '@modules/users/services/ListUsersWhoSponsorTheUser';


class ListSponsorController {
  async indexSponsoring(request: Request, response: Response): Promise<Response> {
    const {user_id} = request.params;

    const listUsersWhoSponsorTheUser = new ListUsersWhoSponsorTheUser();

    const sponsoring = await listUsersWhoSponsorTheUser.execute(user_id);

    return response.json(sponsoring);
  }

  async indexSponsored(request: Request, response: Response): Promise<Response> {
    const {user_id} = request.params;

    const listUsersSponsoredByUser = new ListUsersSponsoredByUser();

    const sponsored = await listUsersSponsoredByUser.execute(user_id);

    return response.json(sponsored);
  }
}

export default ListSponsorController;