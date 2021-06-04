import ListShopBalanceAmountService from '@modules/sponsorships/services/ListShopBalanceAmountService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '../../typeorm/repositories/PostgresSponsorshipsRepository';

export default class SponsoredController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();

    const listShopBalanceAmount = new ListShopBalanceAmountService(
      postgresSponsorshipsRepository,
    );

    const sponsorships = await listShopBalanceAmount.execute(user_id);

    return response.status(201).json(classToClass(sponsorships));
  }
}
