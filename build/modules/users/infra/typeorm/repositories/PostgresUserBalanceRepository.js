"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UserBalance = _interopRequireDefault(require("../entities/UserBalance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgresUserBalanceRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserBalance.default);
  }

  async update(user_id, data) {
    const userBalance = await this.ormRepository.update(user_id, data);

    if (userBalance.affected === 1) {
      const userBalanceUpdated = await this.ormRepository.findOne(user_id);
      return userBalanceUpdated;
    }

    return undefined;
  }

  async findByUserId(user_id) {
    const userBalance = await this.ormRepository.findOne({
      where: {
        user_id
      },
      relations: ['user']
    });
    return userBalance;
  }

  async create(userBalanceData) {
    const userBalance = this.ormRepository.create(userBalanceData);
    await this.ormRepository.save(userBalance);
    return userBalance;
  }

  async save(userBalance) {
    return this.ormRepository.save(userBalance);
  }

}

exports.default = PostgresUserBalanceRepository;