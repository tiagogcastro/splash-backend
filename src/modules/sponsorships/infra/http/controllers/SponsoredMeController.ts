import SearchSponsoredFromUserService from '@modules/sponsorships/services/SearchSponsoredFromUserService';
import PostgresUsersRepository from '@modules/users/infra/typeorm/repositories/PostgresUsersRepository';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '../../typeorm/repositories/PostgresSponsorshipsRepository';

export default class SponsoredMeController {
  async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.query;
    const sponsor_id = request.user.id;
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresUsersRepository = new PostgresUsersRepository();

    const searchSponsoredFromUser = new SearchSponsoredFromUserService(
      postgresSponsorshipsRepository,
      postgresUsersRepository,
    );

    const sponsorships = await searchSponsoredFromUser.execute({
      username: String(username),
      sponsor_id,
    });

    return response.status(200).json(classToClass(sponsorships));
  }
}
