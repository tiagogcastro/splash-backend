import { Request, Response } from 'express';

import ListUsersWhoSponsorTheUser from '@modules/users/services/ListUsersWhoSponsorTheUser';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresSponsoringRepository from '../../typeorm/repositories/PostgresSponsoringRepository';

class SponsoringController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const usersRepository = new PostgresUsersRepository();
    const sponsoringRepository = new PostgresSponsoringRepository();

    const listUsersWhoSponsorTheUser = new ListUsersWhoSponsorTheUser(
      usersRepository,
      sponsoringRepository,
    );

    const sponsoring = await listUsersWhoSponsorTheUser.execute(user_id);

    return response.json(sponsoring);
  }
}

export default SponsoringController;
