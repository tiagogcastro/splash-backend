/* eslint-disable no-param-reassign */
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
    const checkEmailAlreadyExist = await this.usersRepository.findByEmail(
      email,
    );
    const sponsorship =
      await this.sponsorshipsRepository.findByUnreadSponsorshipCode(
        sponsorship_code,
      );

    const checkUserUsernameExist = await this.usersRepository.findByUsername(
      username,
    );

    if (checkEmailAlreadyExist) {
      throw new AppError('This e-mail address already exists.');
    }

    if (checkUserUsernameExist) {
      throw new AppError('This username already exists.', 400);
    }

    if (!terms && !roles) {
      throw new AppError(
        'You cannot to create a account without accepting the terms',
        400,
      );
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
    const hashedPassword = await hash(password, 8);

    let user: User;

    if (!roles) {
      if (!sponsorship)
        throw new AppError('This sponsorship code does not exist', 400);

      if (
        sponsorship.status === 'redeemed' ||
        sponsorship.status === 'expired'
      ) {
        throw new AppError(
          'This sponsorship code does not available or has already expired',
          400,
        );
      }

      user = await this.usersRepository.createByEmail({
        name,
        username,
        email,
        password: hashedPassword,
      });

      // Deixa o patrocinio resgatado e indisponivel
      sponsorship.sponsored_user_id = user.id;
      sponsorship.status = 'redeemed';

      await this.sponsorshipsRepository.save(sponsorship);

      // Cria o saldo e adiciona la
      if (sponsorship.allow_withdrawal) {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorship.amount,
          available_for_withdraw: sponsorship.amount,
        });
      } else {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorship.amount,
        });
        await this.sponsorBalanceRepository.create({
          sponsor_shop_id: sponsorship.sponsor_user_id,
          sponsored_user_id: user.id,
          balance_amount: sponsorship.amount,
        });
      }

      // A loja passa a patrocinar o usuário
      await this.sponsoring.create({
        sponsor_user_id: sponsorship.sponsor_user_id,
        sponsored_user_id: user.id,
      });

      // Loja fica com +1 patrocinado e o usuário fica com +1 patrocinando ele
      await this.sponsoringSponsoredCount.updateCount(
        sponsorship.sponsor_user_id,
        {
          sponsoring_count: +1,
        },
      );

      await this.sponsoringSponsoredCount.updateCount(user.id, {
        sponsored_count: +1,
      });
      // Deixa o patrocinio resgatado e indisponivel

      await this.sponsorshipsRepository.updateSponsorship(
        sponsorship.sponsor_user_id,
        {
          sponsored_user_id: user.id,
          status: 'redeemed',
        },
      );
    } else {
      user = await this.usersRepository.createByEmail({
        name,
        username,
        email,
        password: hashedPassword,
      });

      await this.userBalanceRepository.create({
        user_id: user.id,
        available_for_withdraw: balance_amount,
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
