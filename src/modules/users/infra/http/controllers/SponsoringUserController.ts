import { Request, Response } from 'express';

import ListUsersWhoSponsorTheUser from '@modules/users/services/ListUsersWhoSponsorTheUser';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresSponsoringSponsoredRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredRepository';

class SponsoringController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresSponsoringSponsoredRepository =
      new PostgresSponsoringSponsoredRepository();

    const listUsersWhoSponsorTheUser = new ListUsersWhoSponsorTheUser(
      postgresUsersRepository,
      postgresSponsoringSponsoredRepository,
    );

    const sponsoring = await listUsersWhoSponsorTheUser.execute(user_id);

    return response.json(sponsoring);
  }
}

export default SponsoringController;
