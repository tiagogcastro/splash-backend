import SearchSponsoredFromUserService from '@modules/sponsorships/services/SearchSponsoredFromUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '../../typeorm/repositories/PostgresSponsorshipsRepository';

export default class SponsoredMeController {
  async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.query;
    const sponsor_id = request.user.id;
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();

    const searchSponsoredFromUser = new SearchSponsoredFromUserService(
      postgresSponsorshipsRepository,
    );

    const sponsorships = await searchSponsoredFromUser.execute({
      username: String(username),
      sponsor_id,
    });

    return response.status(201).json(classToClass(sponsorships));
  }
}
