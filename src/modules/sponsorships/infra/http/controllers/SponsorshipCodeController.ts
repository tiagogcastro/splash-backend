import memory from '@modules/sponsorships/in-memory';
import CreateSponsorshipCodeService from '@modules/sponsorships/services/CreateSponsorshipCodeService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SponsorshipCodeController {
  async create(request: Request, response: Response): Promise<Response> {
    const sponsor_user_id = request.user.id;
    const { allow_withdrawal_balance, amount } = request.body;

    const sendSponsorship = container.resolve(CreateSponsorshipCodeService);

    const sponsorship = await sendSponsorship.execute({
      allow_withdrawal_balance,
      sponsor_user_id,
      amount,
    });

    memory.sponsorship = {
      code: sponsorship.sponsorship_code,
    };

    return response.status(201).json(classToClass(sponsorship));
  }
}
