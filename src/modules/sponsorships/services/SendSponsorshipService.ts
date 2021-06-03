import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ISendSponsorshipServiceDTO from '../dtos/ISendSponsorshipServiceDTO';
import Sponsor from '../infra/typeorm/entities/Sponsorship';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

export default class SendSponsorshipService {
  constructor(
    private usersRepository: IUsersRepository,
    private userBalanceRepository: IUserBalanceRepository,
    private sponsorshipsRepository: ISponsorshipsRepository,
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    user_recipient_id,
    sponsor_user_id,
    amount,
    allow_withdrawal_balance = false,
  }: ISendSponsorshipServiceDTO): Promise<Sponsor> {
    let allow_withdrawal = true;

    const user = await this.usersRepository.findById(user_recipient_id);
    const sponsor = await this.usersRepository.findById(sponsor_user_id);

    const sponsorUserBalance = await this.userBalanceRepository.findByUserId(
      sponsor_user_id,
    );
    const recipientUserBalance = await this.userBalanceRepository.findByUserId(
      user_recipient_id,
    );

    if (!user) throw new AppError('The user does not exist', 401);
    if (!sponsor) throw new AppError('The sponsor does not exist', 401);
    if (!sponsorUserBalance)
      throw new AppError('The sponsor balance does not exist', 401);
    if (!recipientUserBalance)
      throw new AppError('The recipient balance does not exist', 401);

    if (amount < 1 || amount > 500) {
      throw new AppError(
        'You cannot report a balance of less than 1 or greater than 500',
        401,
      );
    }
    if (user_recipient_id === sponsor_user_id)
      throw new AppError('You cannot send to yourself');

    if (!(sponsor.roles === 'shop') && !allow_withdrawal_balance)
      throw new AppError('You are not allowed to access here', 401);

    // if()
    const [first, second] = String(amount).split('.');

    let balanceAmount = `${first}.00`;
    if (second) balanceAmount = `${first}.${second.padEnd(2, '0')}`;

    const subject = `você enviou R$${balanceAmount} para ${user.username}`;

    let messageFromSender = {
      name: sponsor.username,
      subject,
    };

    if (user.roles === 'shop') {
      messageFromSender = {
        name: sponsor.username,
        subject: `você pagou R$${balanceAmount} para ${user.username}`,
      };
    }

    if (sponsor.roles === 'shop') {
      allow_withdrawal = allow_withdrawal_balance;
    }

    const messageFromRecipient = {
      name: user.username,
      subject: `você recebeu R$${balanceAmount} de ${sponsor.username}`,
    };

    await this.notificationsRepository.create({
      recipient_id: sponsor_user_id,
      sender_id: sponsor_user_id,
      content: JSON.stringify(messageFromSender),
    });

    await this.notificationsRepository.create({
      recipient_id: user_recipient_id,
      sender_id: sponsor_user_id,
      content: JSON.stringify(messageFromRecipient),
    });

    const sponsorship = await this.sponsorshipsRepository.create({
      sponsored_user_id: user_recipient_id,
      sponsor_user_id,
      amount,
      allow_withdrawal,
    });

    return sponsorship;
  }
}
