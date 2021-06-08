"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _SponsorBalance = _interopRequireDefault(require("../entities/SponsorBalance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgresSponsorBalanceRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_SponsorBalance.default);
  }

  async findAllSponsorBalanceBySponsoredUserId(sponsored_user_id) {
    const sponsorBalance = await this.ormRepository.find({
      where: {
        sponsored_user_id,
        balance_amount: (0, _typeorm.Not)(0)
      },
      relations: ['sponsor']
    });
    return sponsorBalance;
  }

  async findSponsorBalance({
    sponsor_shop_id,
    sponsored_user_id
  }) {
    const sponsorBalance = await this.ormRepository.findOne({
      sponsor_shop_id,
      sponsored_user_id
    });
    return sponsorBalance;
  }

  async create({
    balance_amount,
    sponsor_shop_id,
    sponsored_user_id
  }) {
    const sponsorBalance = this.ormRepository.create({
      balance_amount,
      sponsor_shop_id,
      sponsored_user_id
    });
    await this.ormRepository.save(sponsorBalance);
    return sponsorBalance;
  }

  async save(sponsorBalance) {
    return this.ormRepository.save(sponsorBalance);
  }

}

exports.default = PostgresSponsorBalanceRepository;