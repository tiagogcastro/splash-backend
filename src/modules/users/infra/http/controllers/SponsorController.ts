import { Request, Response } from 'express';

import SponsorUserService from '@modules/users/services/SponsorUserService';
import UnSponsoringUserService from '@modules/users/services/UnSponsoringUserService';
import { container } from 'tsyringe';
import ListUsersWhoSponsorTheUser from '@modules/users/services/ListUsersWhoSponsorTheUser';
import { classToClass } from 'class-transformer';
import PostgresUserRepository from '../../typeorm/repositories/PostgresUserRepository';
import PostgresSponsorSponsoredRepository from '../../typeorm/repositories/PostgresSponsorSponsoredRepository';

class SponsorController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listUsersWhoSponsorTheUser = container.resolve(
      ListUsersWhoSponsorTheUser,
    );

    const sponsoring = await listUsersWhoSponsorTheUser.execute(user_id);

    return response.json(classToClass(sponsoring));
  }

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

    return response.json(classToClass(sponsor));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { user_id_to_remove_sponsor, user_id_to_remove_sponsored } =
      request.body;

    const postgresUserRepository = new PostgresUserRepository();
    const postgresSponsorSponsoredRepository =
      new PostgresSponsorSponsoredRepository();

    const unsponsoringUser = new UnSponsoringUserService(
      postgresUserRepository,
      postgresSponsorSponsoredRepository,
    );

    await unsponsoringUser.execute(
      user_id_to_remove_sponsor,
      user_id_to_remove_sponsored,
    );

    return response.status(204).send();
  }
}

export default SponsorController;
