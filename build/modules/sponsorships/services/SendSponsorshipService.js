"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SendSponsorshipService {
  constructor(usersRepository, userBalanceRepository, sponsorshipsRepository, sponsorBalanceRepository, notificationsRepository) {
    this.usersRepository = usersRepository;
    this.userBalanceRepository = userBalanceRepository;
    this.sponsorshipsRepository = sponsorshipsRepository;
    this.sponsorBalanceRepository = sponsorBalanceRepository;
    this.notificationsRepository = notificationsRepository;
  }

  async execute({
    user_recipient_id,
    sponsor_user_id,
    amount,
    allow_withdrawal_balance = false
  }) {
    let allow_withdrawal = true;
    const sender = await this.usersRepository.findById(sponsor_user_id);
    const recipient = await this.usersRepository.findById(user_recipient_id);
    const userBalance = await this.userBalanceRepository.findByUserId(sponsor_user_id);
    const nonDrawableBalance = await this.sponsorBalanceRepository.findSponsorBalance({
      sponsored_user_id: sponsor_user_id,
      sponsor_shop_id: user_recipient_id
    });
    const sponsorBalance = await this.sponsorBalanceRepository.findSponsorBalance({
      sponsored_user_id: user_recipient_id,
      sponsor_shop_id: sponsor_user_id
    });
    const recipientUserBalance = await this.userBalanceRepository.findByUserId(user_recipient_id);
    if (user_recipient_id === sponsor_user_id) throw new _AppError.default('You cannot send to yourself');
    if (!recipient) throw new _AppError.default('The user does not exist', 401);
    if (!sender) throw new _AppError.default('The sponsor does not exist', 401);
    if (!userBalance) throw new _AppError.default('The sponsor balance does not exist', 401);
    if (!recipientUserBalance) throw new _AppError.default('The recipient balance does not exist', 401);

    if (amount < 1 || amount > 500) {
      throw new _AppError.default('You cannot report a balance of less than 1 or greater than 500', 401);
    }

    const totalAmountForRecipient = ((nonDrawableBalance === null || nonDrawableBalance === void 0 ? void 0 : nonDrawableBalance.balance_amount) || 0) + userBalance.balance_amount;

    if (totalAmountForRecipient < amount) {
      throw new _AppError.default('You cannot send an available amount that you do not have', 400);
    }

    if (!(sender.roles === 'shop') && allow_withdrawal_balance) throw new _AppError.default('You are not allowed to access here', 401);
    if (userBalance.total_balance < amount) throw new _AppError.default('You cannot send an amount that you do not have', 400);
    userBalance.total_balance -= amount;
    recipientUserBalance.total_balance += amount;

    if (nonDrawableBalance && nonDrawableBalance.balance_amount >= amount) {
      nonDrawableBalance.balance_amount -= amount;
      await this.sponsorBalanceRepository.save(nonDrawableBalance);
    } else {
      userBalance.balance_amount -= amount;
    }

    if (sender.roles === 'shop') {
      if (!sponsorBalance) {
        await this.sponsorBalanceRepository.create({
          balance_amount: amount,
          sponsor_shop_id: sponsor_user_id,
          sponsored_user_id: user_recipient_id
        });
      } else {
        if (allow_withdrawal_balance) {
          recipientUserBalance.balance_amount += amount;
        } else {
          sponsorBalance.balance_amount += amount;
        }

        await this.sponsorBalanceRepository.save(sponsorBalance);
      }

      allow_withdrawal = allow_withdrawal_balance;
    }

    if (sender.roles === null || sender.roles === 'user') recipientUserBalance.balance_amount += amount;
    const sponsorship = await this.sponsorshipsRepository.create({
      allow_withdrawal,
      amount,
      sponsor_user_id,
      sponsored_user_id: user_recipient_id
    });
    await this.userBalanceRepository.save(userBalance);
    await this.userBalanceRepository.save(recipientUserBalance);
    const [first, second] = String(amount).split('.');
    let balanceAmount = `${first}.00`;
    if (second) balanceAmount = `${first}.${second.padEnd(2, '0')}`;
    let messageFromSender = {
      name: sender.username,
      subject: `você enviou R$${balanceAmount} para ${recipient.username}`
    };

    if (recipient.roles === 'shop') {
      messageFromSender = {
        name: sender.username,
        subject: `você pagou R$${balanceAmount} para ${recipient.username}`
      };
    }

    const messageFromRecipient = {
      name: recipient.username,
      subject: `você recebeu R$${balanceAmount} de ${sender.username}`
    };
    /**
     * Enviar mensagem para o usuário remetente
     */

    await this.notificationsRepository.create({
      recipient_id: sponsor_user_id,
      sender_id: sponsor_user_id,
      content: JSON.stringify(messageFromSender)
    });
    /**
     * Enviar mensagem para o usuário destinatário
     */

    await this.notificationsRepository.create({
      recipient_id: user_recipient_id,
      sender_id: sponsor_user_id,
      content: JSON.stringify(messageFromRecipient)
    });
    return sponsorship;
  }

}

exports.default = SendSponsorshipService;