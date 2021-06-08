"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
class CreateUsersService {
  constructor(usersRepository, userBalanceRepository, sponsorBalanceRepository, sponsorshipsRepository, sponsoring, sponsoringSponsoredCount) {
    this.usersRepository = usersRepository;
    this.userBalanceRepository = userBalanceRepository;
    this.sponsorBalanceRepository = sponsorBalanceRepository;
    this.sponsorshipsRepository = sponsorshipsRepository;
    this.sponsoring = sponsoring;
    this.sponsoringSponsoredCount = sponsoringSponsoredCount;
  }

  async execute({
    name,
    username,
    email,
    password,
    sponsorship_code,
    terms,
    isShop
  }) {
    const checkUserEmailExist = await this.usersRepository.findByEmail(email);
    const sponsorshipExist = await this.sponsorshipsRepository.findBySponsorshipCode(sponsorship_code);
    const checkUserUsernameExist = await this.usersRepository.findByUsername(username);

    if (checkUserEmailExist) {
      throw new _AppError.default('E-mail address already used.');
    }

    if (checkUserUsernameExist) {
      throw new _AppError.default('Username address already used.', 400);
    }

    if (!terms) {
      throw new _AppError.default('Você não aceitou os termos.', 400);
    }

    if (!username) {
      const randomUsername = `username.${Math.random().toFixed(4).replace('.', '')}${new Date().getTime()}`;
      username = randomUsername;
    }

    if (username.length > 24) {
      throw new _AppError.default('Username só pode ter no máximo 24 caracteres', 400);
    }

    username = username.replace(/\s/g, '');

    if (!name) {
      name = `name.${Math.random().toFixed(4).replace('.', '')}`;
    }

    if (name.length > 30) {
      throw new _AppError.default('O nome só pode ter no máximo 30 caracteres', 400);
    }

    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword
    });

    if (!isShop) {
      if (!sponsorshipExist || sponsorshipExist.sponsorship_code !== sponsorship_code) {
        throw new _AppError.default('Código de patrocínio inválido ou já usado.', 400);
      }

      await this.usersRepository.update(user.id, {
        roles: 'user'
      }); // Deixa o patrocinio resgatado e indisponivel

      await this.sponsorshipsRepository.updateSponsorship(sponsorshipExist.sponsor_user_id, {
        sponsored_user_id: user.id,
        status: 'redeemed'
      }); // Cria o saldo e adiciona la

      if (sponsorshipExist.allow_withdrawal) {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorshipExist.amount,
          balance_amount: sponsorshipExist.amount
        });
      } else {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorshipExist.amount
        });
        await this.sponsorBalanceRepository.create({
          sponsor_shop_id: sponsorshipExist.sponsor_user_id,
          sponsored_user_id: user.id,
          balance_amount: sponsorshipExist.amount
        });
      } // A loja passa a patrocinar o usuário
      // await this.sponsoring.create({
      //   sponsor_user_id: sponsorshipExist.sponsor_user_id,
      //   sponsored_user_id: user.id,
      // });
      // Loja fica com +1 patrocinado e o usuário fica com +1 patrocinando ele


      await this.sponsoringSponsoredCount.updateCount(sponsorshipExist.sponsor_user_id, {
        sponsoring_count: +1
      });
      await this.sponsoringSponsoredCount.updateCount(user.id, {
        sponsored_count: +1
      }); // Deixa o patrocinio resgatado e indisponivel

      await this.sponsorshipsRepository.updateSponsorship(sponsorshipExist.sponsor_user_id, {
        sponsored_user_id: user.id,
        status: 'redeemed'
      });
    } else {
      await this.userBalanceRepository.create({
        user_id: user.id,
        total_balance: 0
      });
      await this.usersRepository.update(user.id, {
        roles: 'shop'
      });
    }

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

exports.default = CreateUsersService;