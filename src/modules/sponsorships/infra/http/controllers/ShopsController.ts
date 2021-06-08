import ListShopBalanceAmountService from '@modules/sponsorships/services/ListShopBalanceAmountService';
import PostgresSponsorBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresSponsorBalanceRepository';
import PostgresUserBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresUserBalanceRepository';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

export default class ShopsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const postgresSponsorBalanceRepository =
      new PostgresSponsorBalanceRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();

    const listShopBalanceAmount = new ListShopBalanceAmountService(
      postgresSponsorBalanceRepository,
      postgresUserBalanceRepository,
    );

    const sponsorships = await listShopBalanceAmount.execute(user_id);

    return response.status(200).json(classToClass(sponsorships));
  }
}
