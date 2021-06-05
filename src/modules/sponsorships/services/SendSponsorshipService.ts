import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
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
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    user_recipient_id,
    sponsor_user_id,
    amount,
    allow_withdrawal_balance = false,
  }: ISendSponsorshipServiceDTO): Promise<Sponsorship> {
    let allow_withdrawal = true;
    const user = await this.usersRepository.findById(user_recipient_id);
    const sponsor = await this.usersRepository.findById(sponsor_user_id);

    const sponsorUserBalance = await this.userBalanceRepository.findByUserId(
      sponsor_user_id,
    );
    const recipientUserBalance = await this.userBalanceRepository.findByUserId(
      user_recipient_id,
    );

    if (user_recipient_id === sponsor_user_id)
      throw new AppError('You cannot send to yourself');

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

    if (!(sponsor.roles === 'shop') && allow_withdrawal_balance)
      throw new AppError('You are not allowed to access here', 401);

    if (sponsorUserBalance.total_balance < amount)
      throw new AppError('You cannot send an amount that you do not have', 400);

    const unvailableBalanceAmount =
      await this.sponsorshipsRepository.findSponsorshipUnavailable({
        sponsored_user_id: sponsor_user_id,
        sponsor_user_id: user_recipient_id,
      });
    if (
      !(user.roles === 'shop') &&
      sponsorUserBalance.balance_amount < amount
    ) {
      throw new AppError(
        'You cannot send an available amount that you do not have',
        400,
      );
    }

    switch (sponsor.roles) {
      case 'shop':
        if (
          unvailableBalanceAmount &&
          unvailableBalanceAmount.amount >= amount
        ) {
          unvailableBalanceAmount.amount -= amount;

          await this.sponsorshipsRepository.save(unvailableBalanceAmount);

          sponsorUserBalance.total_balance -= amount;
        } else {
          if (sponsorUserBalance.balance_amount < amount) {
            throw new AppError(
              'You cannot send an available amount that you do not have',
              400,
            );
          }
          sponsorUserBalance.total_balance -= amount;
          sponsorUserBalance.balance_amount -= amount;
        }

        if (!allow_withdrawal_balance) {
          recipientUserBalance.total_balance += amount;
        } else {
          recipientUserBalance.total_balance += amount;
          recipientUserBalance.balance_amount += amount;
        }
        allow_withdrawal = allow_withdrawal_balance;
        break;

      default:
        if (
          unvailableBalanceAmount &&
          unvailableBalanceAmount.amount >= amount
        ) {
          unvailableBalanceAmount.amount -= amount;

          await this.sponsorshipsRepository.save(unvailableBalanceAmount);

          sponsorUserBalance.total_balance -= amount;
        } else {
          sponsorUserBalance.total_balance -= amount;
          sponsorUserBalance.balance_amount -= amount;
        }
        recipientUserBalance.total_balance += amount;
        recipientUserBalance.balance_amount += amount;
        break;
    }

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

    await this.userBalanceRepository.save(recipientUserBalance);
    await this.userBalanceRepository.save(sponsorUserBalance);

    const findSponsorship = await this.sponsorshipsRepository.findSponsorship({
      sponsor_user_id,
      sponsored_user_id: user_recipient_id,
    });

    let sponsorship: Sponsorship;

    if (findSponsorship) {
      if (sponsor.roles === 'shop')
        findSponsorship.allow_withdrawal = allow_withdrawal_balance;
      else findSponsorship.allow_withdrawal = allow_withdrawal;

      findSponsorship.amount += amount;

      await this.sponsorshipsRepository.save(findSponsorship);

      sponsorship = findSponsorship;
    } else {
      sponsorship = await this.sponsorshipsRepository.create({
        sponsored_user_id: user_recipient_id,
        sponsor_user_id,
        amount,
        allow_withdrawal,
      });
    }

    return sponsorship;
  }
}
