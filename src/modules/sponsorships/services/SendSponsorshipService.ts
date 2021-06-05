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
    let sponsorship = {} as Sponsorship;
    const user = await this.usersRepository.findById(user_recipient_id);
    const sponsor = await this.usersRepository.findById(sponsor_user_id);

    const sponsorUserBalance = await this.userBalanceRepository.findByUserId(
      sponsor_user_id,
    );
    const recipientUserBalance = await this.userBalanceRepository.findByUserId(
      user_recipient_id,
    );
    /**
     * Buscar patrocínio já existente
     */
    const existingSponsorship =
      await this.sponsorshipsRepository.findSponsorship({
        sponsor_user_id,
        sponsored_user_id: user_recipient_id,
      });
    /**
     * Buscar saldo indisponível da loja
     */
    const unavailableBalanceAmount =
      await this.sponsorshipsRepository.findSponsorshipUnavailable({
        sponsored_user_id: sponsor_user_id,
        sponsor_user_id: user_recipient_id,
      });

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
    if (
      (unavailableBalanceAmount?.amount || 0) +
        sponsorUserBalance.balance_amount <
      amount
    ) {
      throw new AppError(
        'You cannot send an available amount that you do not have',
        400,
      );
    }

    /**
     * Retirar o valor de patrocínio do remetente
     */
    sponsorUserBalance.total_balance -= amount;

    /**
     * Verificar se o usuário remetente possuí algum patrocínio enviado pela loja destinatária
     */
    if (unavailableBalanceAmount) {
      if (unavailableBalanceAmount.amount >= amount) {
        unavailableBalanceAmount.amount -= amount;
      } else {
        const remaining = (unavailableBalanceAmount.amount - amount) * -1;

        unavailableBalanceAmount.amount -= amount - remaining;
        sponsorUserBalance.balance_amount -= remaining;
      }
      await this.sponsorshipsRepository.save(unavailableBalanceAmount);
    } else {
      sponsorUserBalance.balance_amount -= amount;
    }
    /**
     * Adicionar patrocínio ao destinatário
     */
    recipientUserBalance.total_balance += amount;

    /**
     * Caso já exista um patrocínio, irá incrementar o valor de patrocínio
     */
    if (existingSponsorship) {
      existingSponsorship.amount += amount;
    }

    /**
     * Se o remetente for uma loja e já possuí um patrocínio enviado anteriormente, poderá ou não permitir o uso livre do patrocínio
     */
    if (sponsor.roles === 'shop') {
      if (
        existingSponsorship &&
        existingSponsorship.allow_withdrawal !== allow_withdrawal_balance
      ) {
        if (allow_withdrawal_balance)
          recipientUserBalance.balance_amount += existingSponsorship.amount;
        else
          recipientUserBalance.balance_amount -=
            existingSponsorship.amount - amount;
      } else if (allow_withdrawal_balance)
        recipientUserBalance.balance_amount += amount;
      allow_withdrawal = allow_withdrawal_balance;
    }
    /**
     * Se o remetente for um usuário o valor enviado deve ser disponível
     */
    if (sponsor.roles === null) recipientUserBalance.balance_amount += amount;

    /**
     * Deve atribuir um patrocínio à uma variável, caso já exista ou não
     */
    if (existingSponsorship) {
      existingSponsorship.allow_withdrawal = allow_withdrawal;

      sponsorship = await this.sponsorshipsRepository.save(existingSponsorship);
    } else {
      sponsorship = await this.sponsorshipsRepository.create({
        sponsored_user_id: user_recipient_id,
        sponsor_user_id,
        amount,
        allow_withdrawal,
      });
    }

    /**
     * Salvar alterações dos valores do remetente e destinatário
     */
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
