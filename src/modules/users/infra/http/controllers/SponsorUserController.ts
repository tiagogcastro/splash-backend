import { Request, Response } from 'express';

import SponsorUserService from '@modules/users/services/SponsorUserService';
import UnSponsoringUserService from '@modules/users/services/UnSponsoringUserService';
import PostgresUserRepository from '../../typeorm/repositories/PostgresUserRepository';
import PostgresSponsorSponsoredRepository from '../../typeorm/repositories/PostgresSponsorSponsoredRepository';

class SponsoringController {
  async update(request: Request, response: Response): Promise<Response> {
    const { sponsoring_userId, sponsored_userId } = request.body;

    const postgresUserRepository = new PostgresUserRepository();
    const postgresSponsorSponsoredRepository =
      new PostgresSponsorSponsoredRepository();

    const sponsoringUser = new SponsorUserService(
      postgresUserRepository,
      postgresSponsorSponsoredRepository,
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

    const postgresUserRepository = new PostgresUserRepository();
    const postgresSponsorSponsoredRepository =
      new PostgresSponsorSponsoredRepository();

    const UnsponsoringUser = new UnSponsoringUserService(
      postgresUserRepository,
      postgresSponsorSponsoredRepository,
    );

    await UnsponsoringUser.execute(
      user_id_to_remove_sponsor,
      user_id_to_remove_sponsored,
    );

    return response.status(204).send();
  }
}

export default SponsoringController;
