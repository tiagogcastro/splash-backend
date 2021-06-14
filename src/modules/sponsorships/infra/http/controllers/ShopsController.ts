import ListShopBalanceAmountService from '@modules/sponsorships/services/ListShopBalanceAmountService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ShopsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listShopBalanceAmount = container.resolve(
      ListShopBalanceAmountService,
    );

    const sponsorships = await listShopBalanceAmount.execute(user_id);

    return response.status(200).json(classToClass(sponsorships));
  }
}
