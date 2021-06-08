"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _User = _interopRequireDefault(require("../infra/typeorm/entities/User"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _auth = _interopRequireDefault(require("../../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
class AuthenticateUserByEmailSession {
  async create({
    username,
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getRepository)(_User.default);
    const {
      expiresIn,
      secret
    } = _auth.default.jwt;
    const user = await usersRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new _AppError.default('User does not exist');
    }

    const passwordVerified = await (0, _bcryptjs.compare)(password, String(user.password));

    if (password && password.length < 6) {
      throw new _AppError.default('A senha precisa ter no mínimo 6 digitos', 401);
    }

    if (!passwordVerified) {
      throw new _AppError.default('Password invalid');
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

exports.default = AuthenticateUserByEmailSession;