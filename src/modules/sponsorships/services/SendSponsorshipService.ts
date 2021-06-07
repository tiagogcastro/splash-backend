import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ISponsorBalanceRepository from '@modules/users/repositories/ISponsorBalanceRepository';
import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
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
    sponsorship_code,
    allow_withdrawal_balance = false,
  }: ISendSponsorshipServiceDTO): Promise<Sponsorship> {
    let allow_withdrawal = true;
    let code: string | undefined;

    const sponsor = await this.usersRepository.findById(sponsor_user_id);

    const sponsorUserBalance = await this.userBalanceRepository.findByUserId(
      sponsor_user_id,
    );
    const user = await this.usersRepository.findById(user_recipient_id);

    const unavailableSponsorBalance =
      await this.sponsorBalanceRepository.findSponsorBalance({
        sponsored_user_id: sponsor_user_id,
        sponsor_shop_id: user_recipient_id,
      });
    const isSponsorBalance =
      await this.sponsorBalanceRepository.findSponsorBalance({
        sponsored_user_id: user_recipient_id,
        sponsor_shop_id: sponsor_user_id,
      });
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
    const unavailableBalance =
      unavailableSponsorBalance &&
      unavailableSponsorBalance.balance_amount -
        unavailableSponsorBalance.available_for_withdrawal;

    if (
      (unavailableBalance || 0) + sponsorUserBalance.balance_amount <
      amount
    ) {
      throw new AppError(
        'You cannot send an available amount that you do not have',
        400,
      );
    }
    if (!(sponsor.roles === 'shop') && allow_withdrawal_balance)
      throw new AppError('You are not allowed to access here', 401);

    if (sponsorUserBalance.total_balance < amount)
      throw new AppError('You cannot send an amount that you do not have', 400);

    sponsorUserBalance.total_balance -= amount;

    recipientUserBalance.total_balance += amount;

    if (sponsor.roles === 'shop') {
      if (!isSponsorBalance) {
        await this.sponsorBalanceRepository.create({
          balance_amount: amount,
          sponsor_shop_id: sponsor_user_id,
          sponsored_user_id: user_recipient_id,
        });
      } else {
        isSponsorBalance.balance_amount += amount;

        await this.sponsorBalanceRepository.save(isSponsorBalance);
      }

      if (sponsorship_code) {
        code = crypto.randomBytes(3).toString('hex').toUpperCase();

        const checkSponsorship =
          await this.sponsorshipsRepository.findBySponsorshipCode(code);

        if (checkSponsorship) throw new AppError('Try again');
      }

      allow_withdrawal = allow_withdrawal_balance;
    }

    if (sponsor.roles === null) recipientUserBalance.balance_amount -= amount;

    const sponsorship = await this.sponsorshipsRepository.create({
      allow_withdrawal,
      amount,
      sponsor_user_id,
      sponsored_user_id: user_recipient_id,
      sponsorship_code: code,
    });

    await this.userBalanceRepository.save(sponsorUserBalance);
    await this.userBalanceRepository.save(recipientUserBalance);

    const [first, second] = String(amount).split('.');

    let balanceAmount = `${first}.00`;
    if (second) balanceAmount = `${first}.${second.padEnd(2, '0')}`;

    let messageFromSender = {
      name: sponsor.username,
      subject: `você enviou R$${balanceAmount} para ${user.username}`,
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

    /**
     * Enviar mensagem para o usuário remetente
     */
    await this.notificationsRepository.create({
      recipient_id: sponsor_user_id,
      sender_id: sponsor_user_id,
      content: JSON.stringify(messageFromSender),
    });

    /**
     * Enviar mensagem para o usuário destinatário
     */
    await this.notificationsRepository.create({
      recipient_id: user_recipient_id,
      sender_id: sponsor_user_id,
      content: JSON.stringify(messageFromRecipient),
    });

    return sponsorship;
  }
}
