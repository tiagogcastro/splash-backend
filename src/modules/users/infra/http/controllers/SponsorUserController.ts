import { Request, Response } from 'express';

import SponsorUserService from '@modules/users/services/SponsorUserService';
import UnSponsoringUserService from '@modules/users/services/UnSponsoringUserService';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresSponsoringRepository from '../../typeorm/repositories/PostgresSponsoringRepository';

class SponsoringController {
  async update(request: Request, response: Response): Promise<Response> {
    const { sponsoring_userId, sponsored_userId } = request.body;

    const usersRepository = new PostgresUsersRepository();
    const sponsoringRepository = new PostgresSponsoringRepository();

    const sponsoringUser = new SponsorUserService(
      usersRepository,
      sponsoringRepository,
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

    const usersRepository = new PostgresUsersRepository();
    const sponsoringRepository = new PostgresSponsoringRepository();

    const UnsponsoringUser = new UnSponsoringUserService(
      usersRepository,
      sponsoringRepository,
    );

    await UnsponsoringUser.execute(
      user_id_to_remove_sponsor,
      user_id_to_remove_sponsored,
    );

    return response.status(204).send();
  }
}

export default SponsoringController;
