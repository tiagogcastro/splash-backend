/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import jwtConfig from '@config/auth';
import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import client from 'twilio';

import twilioConfig from '@config/twilio';
import User from '../infra/typeorm/entities/User';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import ISponsorBalanceRepository from '../repositories/ISponsorBalanceRepository';
import ISponsoringRepository from '../repositories/ISponsoringRepository';
import ISponsoringSponsoredCountRepository from '../repositories/ISponsoringSponsoredCountRepository';

interface Request {
  roles?: string;
  phone_number?: string;
  balance_amount?: number;
  sponsorship_code?: string;
  terms: boolean;
}

interface Response {
  user: User;
  token: string;
}

function createUsername() {
  const username = `username.${Math.random()
    .toFixed(4)
    .replace('.', '')}${new Date().getTime()}`;
  return username;
}

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

export default class CreateUsersByPhoneNumberService {
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
    phone_number,
    balance_amount = 0,
    sponsorship_code,
    terms,
  }: Request): Promise<Response> {
    if (!phone_number) {
      throw new AppError('Phone number is missing');
    }

    const checkUserPhoneNumberExists =
      await this.usersRepository.findByPhoneNumber(phone_number);

    if (checkUserPhoneNumberExists) {
      throw new AppError('This phone number already used');
    }

    const sponsorship =
      await this.sponsorshipsRepository.findByUnreadSponsorshipCode(
        sponsorship_code,
      );

    if (!terms) {
      throw new AppError(
        'You cannot to create a account without accepting the terms',
        400,
      );
    }

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

      user = await this.usersRepository.createByPhoneNumber({
        phone_number,
        username: createUsername(),
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
      // await this.sponsoring.create({
      //   sponsor_user_id: sponsorship.sponsor_user_id,
      //   sponsored_user_id: user.id,
      // });

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
      user = await this.usersRepository.createByPhoneNumber({
        phone_number,
        username: createUsername(),
      });

      await this.userBalanceRepository.create({
        user_id: user.id,
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
