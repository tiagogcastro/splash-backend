import SearchListSponsoredByUserService from '@modules/sponsorships/services/SearchListSponsoredFromUserService';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '../../typeorm/repositories/PostgresSponsorshipsRepository';

export default class SponsoredController {
  async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.query;
    const sponsor_id = request.user.id;
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();

    const searchListSponsoredByUser = new SearchListSponsoredByUserService(
      postgresSponsorshipsRepository,
    );

    const sponsorships = await searchListSponsoredByUser.execute({
      username: String(username),
      sponsor_id,
    });

    return response.status(201).json(sponsorships);
  }
}
