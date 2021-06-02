import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ISendSponsorshipServiceDTO from '../dtos/ISendSponsorshipServiceDTO';
import Sponsor from '../infra/typeorm/entities/Sponsorship';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

// Toda parte de enviar patriocion:
// Quando clicar no botão "patrocinar" no perfil do usuario, chamará este service
// Quando clicar em "patrocinar" na tela que lista todos os que eu já patrocíno, chamará este service

export default class SendSponsorshipService {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsorshipsRepository: ISponsorshipsRepository,
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    user_recipient_id,
    sponsor_id,
    balance_amount,
    allow_withdrawal = false,
  }: ISendSponsorshipServiceDTO): Promise<Sponsor> {
    let withdrawal_balance_available = true;
    const user = await this.usersRepository.findById(user_recipient_id);
    const sponsor = await this.usersRepository.findById(sponsor_id);

    if (!user) throw new AppError('The user does not exist', 401);
    if (!sponsor) throw new AppError('The sponsor does not exist', 401);

    if (balance_amount < 1 || balance_amount > 500) {
      throw new AppError(
        'You cannot report a balance of less than 1 or greater than 500',
        401,
      );
    }
    if (user_recipient_id === sponsor_id)
      throw new AppError('You cannot send to yourself');

    if (!(sponsor.permissions === 'shop') && !allow_withdrawal)
      throw new AppError('You are not allowed to access here', 401);

    const [first, second] = String(balance_amount).split('.');

    let balanceAmount = `${first}.00`;
    if (second) balanceAmount = `${first}.${second.padEnd(2, '0')}`;

    let subject = `você enviou R$${balanceAmount} para ${user.username}`;

    if (user.permissions === 'shop') {
      subject = `você pagou R$${balanceAmount} para ${user.username}`;
    }

    if (sponsor.permissions === 'shop') {
      withdrawal_balance_available = allow_withdrawal;
    }

    const messageFromRecipient = {
      name: user.username,
      subject: `você recebeu R$${balanceAmount} de ${sponsor.username}`,
    };

    const messageFromSender = {
      name: sponsor.username,
      subject,
    };
    await this.notificationsRepository.create({
      recipient_id: sponsor_id,
      sender_id: sponsor_id,
      content: JSON.stringify(messageFromSender),
    });

    await this.notificationsRepository.create({
      recipient_id: user_recipient_id,
      sender_id: sponsor_id,
      content: JSON.stringify(messageFromRecipient),
    });

    const sponsorship = await this.sponsorshipsRepository.create({
      user_recipient_id,
      sponsor_id,
      your_sponsor_balance: balance_amount,
      withdrawal_balance_available,
    });

    return sponsorship;
  }
}
