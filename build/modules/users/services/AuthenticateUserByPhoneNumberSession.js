"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _User = _interopRequireDefault(require("../infra/typeorm/entities/User"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _jsonwebtoken = require("jsonwebtoken");

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
class AuthenticateUserByPhoneNumberSession {
  async create({
    phone_number
  }) {
    const {
      expiresIn,
      secret
    } = _auth.default.jwt;
    const usersRepository = (0, _typeorm.getRepository)(_User.default);
    const user = await usersRepository.findOne({
      where: {
        phone_number
      }
    });

    if (!user) {
      throw new _AppError.default('User does not exist');
    }

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

exports.default = AuthenticateUserByPhoneNumberSession;