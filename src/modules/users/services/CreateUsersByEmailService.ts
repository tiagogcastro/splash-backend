/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import jwtConfig from '@config/auth';
import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import ISponsorBalanceRepository from '../repositories/ISponsorBalanceRepository';
import ISponsoringRepository from '../repositories/ISponsoringRepository';
import ISponsoringSponsoredCountRepository from '../repositories/ISponsoringSponsoredCountRepository';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  roles?: string;
  name?: string;
  email: string;
  balance_amount?: number;
  username?: string;
  password: string;
  sponsorship_code?: string;
  terms: boolean;
}

interface Response {
  user: User;
  token: string;
}

export default class CreateUsersService {
  constructor(
    private usersRepository: IUsersRepository,
    private userBalanceRepository: IUserBalanceRepository,
    private sponsorBalanceRepository: ISponsorBalanceRepository,
    private sponsorshipsRepository: ISponsorshipsRepository,
    private sponsoring: ISponsoringRepository,
    private sponsoringSponsoredCount: ISponsoringSponsoredCountRepository,
  ) {}

  public async execute({
    roles,
    name,
    username,
    email,
    balance_amount = 0,
    password,
    sponsorship_code,
    terms,
  }: Request): Promise<Response> {
    const checkUserEmailExist = await this.usersRepository.findByEmail(email);
    const sponsorshipExist =
      await this.sponsorshipsRepository.findBySponsorshipCode(sponsorship_code);

    const checkUserUsernameExist = await this.usersRepository.findByUsername(
      username,
    );

    if (checkUserEmailExist) {
      throw new AppError('E-mail address already used.');
    }

    if (checkUserUsernameExist) {
      throw new AppError('Username address already used.', 400);
    }

    if (!terms && !roles) {
      throw new AppError('Você não aceitou os termos.', 400);
    }

    if (!username) {
      const randomUsername = `user${Math.random()
        .toFixed(4)
        .replace('.', '')}${new Date().getTime()}`;
      username = randomUsername;
    }

    username = username.replace(/\s/g, '');

    if (!name) {
      name = `name.${Math.random().toFixed(4).replace('.', '')}`;
    }

    if (name.length > 30) {
      throw new AppError('O nome só pode ter no máximo 30 caracteres', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (!roles) {
      if (
        !sponsorshipExist ||
        sponsorshipExist.sponsorship_code !== sponsorship_code
      ) {
        throw new AppError('Código de patrocínio inválido ou já usado.', 400);
      }

      // Deixa o patrocinio resgatado e indisponivel
      await this.sponsorshipsRepository.updateSponsorship(
        sponsorshipExist.sponsor_user_id,
        {
          sponsored_user_id: user.id,
          status: 'redeemed',
        },
      );

      // Cria o saldo e adiciona la
      if (sponsorshipExist.allow_withdrawal) {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorshipExist.amount,
          balance_amount: sponsorshipExist.amount,
        });
      } else {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorshipExist.amount,
        });
        await this.sponsorBalanceRepository.create({
          sponsor_shop_id: sponsorshipExist.sponsor_user_id,
          sponsored_user_id: user.id,
          balance_amount: sponsorshipExist.amount,
        });
      }

      // A loja passa a patrocinar o usuário
      // await this.sponsoring.create({
      //   sponsor_user_id: sponsorshipExist.sponsor_user_id,
      //   sponsored_user_id: user.id,
      // });

      // Loja fica com +1 patrocinado e o usuário fica com +1 patrocinando ele
      await this.sponsoringSponsoredCount.updateCount(
        sponsorshipExist.sponsor_user_id,
        {
          sponsoring_count: +1,
        },
      );

      await this.sponsoringSponsoredCount.updateCount(user.id, {
        sponsored_count: +1,
      });
      // Deixa o patrocinio resgatado e indisponivel

      await this.sponsorshipsRepository.updateSponsorship(
        sponsorshipExist.sponsor_user_id,
        {
          sponsored_user_id: user.id,
          status: 'redeemed',
        },
      );
    } else {
      await this.userBalanceRepository.create({
        user_id: user.id,
        balance_amount,
        total_balance: balance_amount,
      });

      await this.usersRepository.update(user.id, {
        roles,
      });
    }

    const { secret, expiresIn } = jwtConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
