import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ISponsorBalanceRepository from '@modules/users/repositories/ISponsorBalanceRepository';
import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ISendSponsorshipServiceDTO from '../dtos/ISendSponsorshipServiceDTO';
import Sponsorship from '../infra/typeorm/entities/Sponsorship';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

export default class SendSponsorshipService {
  constructor(
    private usersRepository: IUsersRepository,
    private userBalanceRepository: IUserBalanceRepository,
    private sponsorshipsRepository: ISponsorshipsRepository,
    private sponsorBalanceRepository: ISponsorBalanceRepository,
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    user_recipient_id,
    sponsor_user_id,
    amount,
    allow_withdrawal_balance = false,
  }: ISendSponsorshipServiceDTO): Promise<Sponsorship> {
    let allow_withdrawal = true;

    const sender = await this.usersRepository.findById(sponsor_user_id);
    const recipient = await this.usersRepository.findById(user_recipient_id);

    const userBalance = await this.userBalanceRepository.findByUserId(
      sponsor_user_id,
    );

    const nonDrawableBalance =
      await this.sponsorBalanceRepository.findSponsorBalance({
        sponsored_user_id: sponsor_user_id,
        sponsor_shop_id: user_recipient_id,
      });
    const sponsorBalance =
      await this.sponsorBalanceRepository.findSponsorBalance({
        sponsored_user_id: user_recipient_id,
        sponsor_shop_id: sponsor_user_id,
      });
    const recipientUserBalance = await this.userBalanceRepository.findByUserId(
      user_recipient_id,
    );

    if (user_recipient_id === sponsor_user_id)
      throw new AppError('You cannot send to yourself');

    if (!recipient) throw new AppError('The user does not exist', 401);
    if (!sender) throw new AppError('The sponsor does not exist', 401);
    if (!userBalance)
      throw new AppError('The sponsor balance does not exist', 401);
    if (!recipientUserBalance)
      throw new AppError('The recipient balance does not exist', 401);

    if (amount < 1 || amount > 500) {
      throw new AppError(
        'You cannot report a balance of less than 1 or greater than 500',
        401,
      );
    }

    const totalAmountForRecipient =
      (nonDrawableBalance?.balance_amount || 0) +
      userBalance.available_for_withdraw;

    if (totalAmountForRecipient < amount) {
      throw new AppError(
        'You cannot send an available amount that you do not have',
        400,
      );
    }

    if (!(sender.roles === 'shop') && allow_withdrawal_balance)
      throw new AppError('You are not allowed to access here', 401);

    if (userBalance.total_balance < amount)
      throw new AppError('You cannot send an amount that you do not have', 400);

    userBalance.total_balance -= amount;
    recipientUserBalance.total_balance += amount;

    if (nonDrawableBalance && nonDrawableBalance.balance_amount >= amount) {
      nonDrawableBalance.balance_amount -= amount;

      await this.sponsorBalanceRepository.save(nonDrawableBalance);
    } else {
      userBalance.available_for_withdraw -= amount;
    }

    if (sender.roles === 'shop') {
      if (!sponsorBalance) {
        await this.sponsorBalanceRepository.create({
          balance_amount: amount,
          sponsor_shop_id: sponsor_user_id,
          sponsored_user_id: user_recipient_id,
        });
      } else {
        if (allow_withdrawal_balance) {
          recipientUserBalance.available_for_withdraw += amount;
        } else {
          sponsorBalance.balance_amount += amount;
        }

        await this.sponsorBalanceRepository.save(sponsorBalance);
      }

      allow_withdrawal = allow_withdrawal_balance;
    }

    if (sender.roles === null || sender.roles === 'default')
      recipientUserBalance.available_for_withdraw += amount;

    const sponsorship = await this.sponsorshipsRepository.create({
      allow_withdrawal,
      amount,
      sponsor_user_id,
      sponsored_user_id: user_recipient_id,
    });

    await this.userBalanceRepository.save(userBalance);
    await this.userBalanceRepository.save(recipientUserBalance);

    const [first, second] = String(amount).split('.');

    let balanceAmount = `${first}.00`;
    if (second) balanceAmount = `${first}.${second.padEnd(2, '0')}`;

    let subject = `você enviou R$${balanceAmount} para ${recipient.username}`;

    if (recipient.roles === 'shop') {
      subject = `você pagou R$${balanceAmount} para ${recipient.username}`;
    }

    await this.notificationsRepository.create({
      recipient_id: sponsor_user_id,
      sender_id: sponsor_user_id,
      content: subject,
    });

    await this.notificationsRepository.create({
      recipient_id: user_recipient_id,
      sender_id: sponsor_user_id,
      content: `você recebeu R$${balanceAmount} de ${sender.username}`,
    });

    return sponsorship;
  }
}
