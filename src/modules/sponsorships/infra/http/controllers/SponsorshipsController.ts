import SendSponsorshipService from '@modules/sponsorships/services/SendSponsorshipService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SponsorshipsController {
  async create(request: Request, response: Response): Promise<Response> {
    const sponsor_user_id = request.user.id;
    const { user_recipient_id, allow_withdrawal_balance, amount } =
      request.body;

    const sendSponsorship = container.resolve(SendSponsorshipService);

    const sponsorship = await sendSponsorship.execute({
      user_recipient_id,
      sponsor_user_id,
      allow_withdrawal_balance,
      amount,
    });

    return response.status(201).json(classToClass(sponsorship));
  }
}
