import { Request, Response } from 'express';

import SponsorUserService from '@modules/users/services/SponsorUserService';
import UnSponsoringUserService from '@modules/users/services/UnSponsoringUserService';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresSponsoringSponsoredRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredRepository';

class SponsoringController {
  async update(request: Request, response: Response): Promise<Response> {
    const { sponsoring_userId, sponsored_userId } = request.body;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresSponsoringSponsoredRepository =
      new PostgresSponsoringSponsoredRepository();

    const sponsoringUser = new SponsorUserService(
      postgresUsersRepository,
      postgresSponsoringSponsoredRepository,
    );

    const sponsor = await sponsoringUser.execute(
      sponsoring_userId,
      sponsored_userId,
    );

    return response.json(sponsor);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { user_id_to_remove_sponsor, user_id_to_remove_sponsored } =
      request.body;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresSponsoringSponsoredRepository =
      new PostgresSponsoringSponsoredRepository();

    const UnsponsoringUser = new UnSponsoringUserService(
      postgresUsersRepository,
      postgresSponsoringSponsoredRepository,
    );

    await UnsponsoringUser.execute(
      user_id_to_remove_sponsor,
      user_id_to_remove_sponsored,
    );

    return response.status(204).send();
  }
}

export default SponsoringController;
