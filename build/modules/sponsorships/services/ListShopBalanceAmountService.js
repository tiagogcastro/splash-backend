"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListShopBalanceAmountService {
  constructor(sponsorBalanceRepository, userBalanceRepository) {
    this.sponsorBalanceRepository = sponsorBalanceRepository;
    this.userBalanceRepository = userBalanceRepository;
  }

  async execute(user_id) {
    const sponsorBalance = await this.sponsorBalanceRepository.findAllSponsorBalanceBySponsoredUserId(user_id);
    const userBalance = await this.userBalanceRepository.findByUserId(user_id);
    if (!userBalance) throw new _AppError.default('User does not exist');
    const sponsorBalancePlusBalanceAvailable = sponsorBalance.map(sponsorBalanceItem => {
      return { ...sponsorBalanceItem,
        balance_amount: sponsorBalanceItem.balance_amount + userBalance.balance_amount
      };
    });
    return sponsorBalancePlusBalanceAvailable;
  }

}

exports.default = ListShopBalanceAmountService;