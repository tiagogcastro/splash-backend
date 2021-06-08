"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateSponsorshipCodeService {
  constructor(usersRepository, userBalanceRepository, sponsorshipsRepository) {
    this.usersRepository = usersRepository;
    this.userBalanceRepository = userBalanceRepository;
    this.sponsorshipsRepository = sponsorshipsRepository;
  }

  async execute({
    sponsor_user_id,
    amount,
    allow_withdrawal_balance = false
  }) {
    const sponsor = await this.usersRepository.findById(sponsor_user_id);
    const sponsorUserBalance = await this.userBalanceRepository.findByUserId(sponsor_user_id);
    if (!sponsor) throw new _AppError.default('The sponsor does not exist', 401);
    if (!sponsorUserBalance) throw new _AppError.default('The sponsor balance does not exist', 401);
    if (sponsor.roles !== 'shop') throw new _AppError.default('You are not allowed to access here', 401);

    if (amount < 1 || amount > 500) {
      throw new _AppError.default('You cannot report a balance of less than 1 or greater than 500', 401);
    }

    if (sponsorUserBalance.balance_amount < amount) {
      throw new _AppError.default('You cannot send an available amount that you do not have', 400);
    }

    if (sponsorUserBalance.total_balance < amount) throw new _AppError.default('You cannot send an amount that you do not have', 400);
    sponsorUserBalance.total_balance -= amount;
    sponsorUserBalance.balance_amount -= amount;
    await this.userBalanceRepository.save(sponsorUserBalance);

    const code = _crypto.default.randomBytes(3).toString('hex').toUpperCase();

    const checkSponsorship = await this.sponsorshipsRepository.findBySponsorshipCode(code);
    if (checkSponsorship) throw new _AppError.default('Try again');
    const sponsorship = await this.sponsorshipsRepository.create({
      allow_withdrawal: allow_withdrawal_balance,
      amount,
      sponsor_user_id,
      sponsorship_code: code
    });
    return sponsorship;
  }

}

exports.default = CreateSponsorshipCodeService;