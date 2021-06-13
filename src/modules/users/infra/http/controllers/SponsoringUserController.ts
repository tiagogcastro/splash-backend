import ListUsersWhoSponsorTheUser from '@modules/users/services/ListUsersWhoSponsorTheUser';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SponsoringController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listUsersWhoSponsorTheUser = container.resolve(
      ListUsersWhoSponsorTheUser,
    );

    const sponsoring = await listUsersWhoSponsorTheUser.execute(user_id);

    return response.json(sponsoring);
  }
}

export default SponsoringController;
