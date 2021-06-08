"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgresUsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async update(id, userData) {
    const {
      affected
    } = await this.ormRepository.update(id, userData);
    return {
      affected
    };
  }

  async create(userData) {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByUsername(username) {
    const user = await this.ormRepository.findOne({
      where: {
        username
      }
    });
    return user;
  }

  async findByPhoneNumber(phone_number) {
    const user = await this.ormRepository.findOne({
      where: {
        phone_number
      }
    });
    return user;
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async save(userData) {
    const user = await this.ormRepository.save(userData);
    return user;
  }

}

exports.default = PostgresUsersRepository;