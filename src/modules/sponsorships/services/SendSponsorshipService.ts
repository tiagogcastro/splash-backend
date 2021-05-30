import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ISendSponsorshipServiceDTO from '../dtos/ISendSponsorshipServiceDTO';
import Sponsor from '../infra/typeorm/entities/Sponsorship';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

export default class SendSponsorshipService {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsorshipsRepository: ISponsorshipsRepository,
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    user_recipient_id,
    your_sponsor_balance,
    allow_withdrawal = false,
    sponsor_id,
  }: ISendSponsorshipServiceDTO): Promise<Sponsor> {
    let withdrawal_balance_available = true;

    const user = await this.usersRepository.findById(user_recipient_id);
    const sponsor = await this.usersRepository.findById(sponsor_id);

    if (!user) throw new AppError('The user does not exist', 401);
    if (!sponsor) throw new AppError('The sponsor does not exist', 401);

    if (!(user.permissions === 1) && allow_withdrawal)
      throw new AppError('You are not allowed to access here', 401);

    const message = {
      name: user.username,
      subject: `você recebeu R$${your_sponsor_balance} de ${sponsor.username}`,
    };
    await this.notificationsRepository.create({
      recipient_id: user_recipient_id,
      content: JSON.stringify(message),
    });

    if (user.permissions === 1) {
      withdrawal_balance_available = allow_withdrawal;
    }

    const sponsorship = await this.sponsorshipsRepository.create({
      user_recipient_id,
      sponsor_id,
      your_sponsor_balance,
      withdrawal_balance_available,
    });

    return sponsorship;
  }
}
