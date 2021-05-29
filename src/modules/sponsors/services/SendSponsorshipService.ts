import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import ISendSponsorshipServiceDTO from '../dtos/ISendSponsorshipServiceDTO';
import Sponsor from '../infra/typeorm/schemas/Sponsor';
import ISponsorsRepository from '../repositories/ISponsorsRepository';

export default class SendSponsorshipService {
  constructor(
    private sponsorsRepository: ISponsorsRepository,
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    user_recipient_id,
    your_sponsor_balance,
    allow_withdrawal = false,
    sponsor_id,
  }: ISendSponsorshipServiceDTO): Promise<Sponsor> {
    const withdrawal_balance_available = true;

    const usersRepository = getRepository(User);

    const findUser = await usersRepository.findOne(user_recipient_id);
    const findSponsor = await usersRepository.findOne(sponsor_id);

    if (!findUser) throw new AppError('The user does not exist', 401);
    if (!findSponsor) throw new AppError('The sponsor does not exist', 401);

    // if (!(user.enum === 2) && allow_withdrawal)
    //   throw new AppError('You are not allowed to access here', 401);

    // if (user.enum === 2) {
    //   withdrawal_balance_available = allow_withdrawal;
    // }

    const message = {
      name: findUser.name || '',
      subject: `você recebeu R$${your_sponsor_balance} de ${findSponsor.name}`,
    };
    await this.notificationsRepository.create({
      recipient_id: user_recipient_id,
      content: JSON.stringify(message),
    });

    const sponsor = await this.sponsorsRepository.create({
      user_recipient_id,
      sponsor_id,
      your_sponsor_balance,
      withdrawal_balance_available,
    });

    return sponsor;
  }
}
