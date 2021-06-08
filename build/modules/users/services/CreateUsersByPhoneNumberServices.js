"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
function createUsername() {
  const username = `username.${Math.random().toFixed(4).replace('.', '')}${new Date().getTime()}`;
  return username;
}

class CreateUsersByPhoneNumberService {
  constructor(usersRepository, userBalanceRepository) {
    this.usersRepository = usersRepository;
    this.userBalanceRepository = userBalanceRepository;
  }

  async execute({
    phone_number
  }) {
    const checkUserPhoneNumberExists = await this.usersRepository.findByPhoneNumber(phone_number);

    if (checkUserPhoneNumberExists) {
      throw new _AppError.default('This phone number already used');
    }

    const user = await this.usersRepository.create({
      phone_number,
      username: createUsername()
    });
    await this.usersRepository.save(user);
    await this.userBalanceRepository.create({
      user_id: user.id
    });
    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: user.id,
      expiresIn
    });
    return {
      user,
      token
    };
  }

}

exports.default = CreateUsersByPhoneNumberService;