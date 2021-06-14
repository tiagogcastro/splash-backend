/* eslint-disable no-param-reassign */
import jwtConfig from '@config/auth';
import ISponsorshipRepository from '@modules/sponsorships/repositories/ISponsorshipRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import ISponsorBalanceRepository from '../repositories/ISponsorBalanceRepository';
import ISponsorSponsoredRepository from '../repositories/ISponsorSponsoredRepository';
import IUserSponsorSponsoredCountRepository from '../repositories/IUserSponsoringSponsoredCountRepository';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  role?: string;
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
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserBalanceRepository')
    private userBalanceRepository: IUserBalanceRepository,

    @inject('SponsorBalanceRepository')
    private sponsorBalanceRepository: ISponsorBalanceRepository,

    @inject('SponsorshipRepository')
    private sponsorshipRepository: ISponsorshipRepository,

    @inject('SponsorSponsoredRepository')
    private sponsorSponsoredRepository: ISponsorSponsoredRepository,

    @inject('UserSponsorSponsoredCountRepository')
    private userSponsorSponsoredCountRepository: IUserSponsorSponsoredCountRepository,
  ) {}

  public async execute({
    role,
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
      await this.sponsorshipRepository.findByUnreadSponsorshipCode(
        sponsorship_code,
      );

    if (phone_number) {
      const checkUserPhoneNumberExists =
        await this.userRepository.findByPhoneNumber(phone_number);

      if (checkUserPhoneNumberExists) {
        throw new AppError('This phone number already exists');
      }
    }
    if (username) {
      const checkUserUsernameExist = await this.userRepository.findByUsername(
        username,
      );
      if (checkUserUsernameExist) {
        throw new AppError('This username already exists.', 400);
      }
    }
    if (email) {
      const checkEmailAlreadyExist = await this.userRepository.findByEmail(
        email,
      );
      if (checkEmailAlreadyExist) {
        throw new AppError('This email address already exists.');
      }
    }

    if (!terms && !role) {
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

    if (!role) {
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

      user = await this.userRepository.create({
        name,
        username,
        role: role || 'default',
        phone_number,
        email,
        password: hashedPassword,
      });

      sponsorship.sponsored_user_id = user.id;
      sponsorship.status = 'redeemed';

      await this.sponsorshipRepository.save(sponsorship);

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
          sponsor_user_id: sponsorship.sponsor_user_id,
          sponsored_user_id: user.id,
          balance_amount: sponsorship.amount,
        });
      }

      // A loja passa a patrocinar o usuário
      await this.sponsorSponsoredRepository.create({
        sponsor_user_id: sponsorship.sponsor_user_id,
        sponsored_user_id: user.id,
      });

      await this.userSponsorSponsoredCountRepository.create({
        user_id: user.id,
        sponsor_count: 1,
      });
      const userSponsorSponsoredCount =
        await this.userSponsorSponsoredCountRepository.findByUserId(
          sponsorship.sponsor_user_id,
        );

      if (userSponsorSponsoredCount) {
        userSponsorSponsoredCount.sponsored_count += 1;

        await this.userSponsorSponsoredCountRepository.save(
          userSponsorSponsoredCount,
        );
      }
    } else {
      user = await this.userRepository.create({
        name,
        username,
        phone_number,
        role: role || 'default',
        email,
        password: hashedPassword,
      });

      await this.userSponsorSponsoredCountRepository.create({
        user_id: user.id,
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
