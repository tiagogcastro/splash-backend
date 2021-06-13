/* eslint-disable no-param-reassign */
import jwtConfig from '@config/auth';
import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import ISponsorBalanceRepository from '../repositories/ISponsorBalanceRepository';
import ISponsoringSponsoredRepository from '../repositories/ISponsoringSponsoredRepository';
import IUserSponsoringSponsoredCountRepository from '../repositories/IUserSponsoringSponsoredCountRepository';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  roles?: string;
  name?: string;
  phone_number?: string;
  email?: string;
  balance_amount?: number;
  username?: string;
  password: string;
  sponsorship_code?: string;
  terms?: boolean;
}

interface Response {
  user: User;
  token: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserBalanceRepository')
    private userBalanceRepository: IUserBalanceRepository,

    @inject('SponsorBalanceRepository')
    private sponsorBalanceRepository: ISponsorBalanceRepository,

    @inject('SponsorshipsRepository')
    private sponsorshipsRepository: ISponsorshipsRepository,

    @inject('SponsoringSponsoredRepository')
    private sponsoringSponsoredRepository: ISponsoringSponsoredRepository,

    @inject('UserSponsoringSponsoredCountRepository')
    private userSponsoringSponsoredCountRepository: IUserSponsoringSponsoredCountRepository,
  ) {}

  public async execute({
    roles,
    name,
    phone_number,
    username,
    email,
    balance_amount = 0,
    password,
    sponsorship_code,
    terms,
  }: Request): Promise<Response> {
    const sponsorship =
      await this.sponsorshipsRepository.findByUnreadSponsorshipCode(
        sponsorship_code,
      );

    if (phone_number) {
      const checkUserPhoneNumberExists =
        await this.usersRepository.findByPhoneNumber(phone_number);

      if (checkUserPhoneNumberExists) {
        throw new AppError('This phone number already exists');
      }
    }
    if (username) {
      const checkUserUsernameExist = await this.usersRepository.findByUsername(
        username,
      );
      if (checkUserUsernameExist) {
        throw new AppError('This username already exists.', 400);
      }
    }
    if (email) {
      const checkEmailAlreadyExist = await this.usersRepository.findByEmail(
        email,
      );
      if (checkEmailAlreadyExist) {
        throw new AppError('This email address already exists.');
      }
    }

    if (!terms && !roles) {
      throw new AppError(
        'You cannot to create an account without accepting the terms',
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

      user = await this.usersRepository.create({
        name,
        username,
        roles: roles || 'default',
        phone_number,
        email,
        password: hashedPassword,
      });

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
      await this.sponsoringSponsoredRepository.create({
        sponsor_user_id: sponsorship.sponsor_user_id,
        sponsored_user_id: user.id,
      });

      // Loja fica com +1 patrocinado e o usuário fica com +1 patrocinando ele
      await this.userSponsoringSponsoredCountRepository.updateCount(
        sponsorship.sponsor_user_id,
        {
          sponsoring_count: +1,
        },
      );

      await this.userSponsoringSponsoredCountRepository.updateCount(user.id, {
        sponsored_count: +1,
      });
    } else {
      user = await this.usersRepository.create({
        name,
        username,
        phone_number,
        roles: roles || 'default',
        email,
        password: hashedPassword,
      });

      await this.userBalanceRepository.create({
        user_id: user.id,
        available_for_withdraw: balance_amount,
        total_balance: balance_amount,
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
