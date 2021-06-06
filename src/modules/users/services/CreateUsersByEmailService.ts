/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import jwtConfig from '@config/auth';
import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import ISponsoringRepository from '../repositories/ISponsoringRepository';
import ISponsoringSponsoredCountRepository from '../repositories/ISponsoringSponsoredCountRepository';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name?: string;
  email: string;
  username?: string;
  password: string;
  sponsorship_code?: string;
  terms: boolean;
  isShop: boolean
}

interface Response {
  user: User;
  token: string;
}

export default class CreateUsersService {
  constructor(
    private usersRepository: IUsersRepository,
    private userBalanceRepository: IUserBalanceRepository,
    private sponsorships: ISponsorshipsRepository,
    private sponsoring: ISponsoringRepository,
    private sponsoringSponsoredCount: ISponsoringSponsoredCountRepository
  ) {}

  public async execute({
    name,
    username,
    email,
    password,
    sponsorship_code,
    terms,
    isShop
  }: Request): Promise<Response> {
    const checkUserEmailExist = await this.usersRepository.findByEmail(email);
    const sponsorshipExist = await this.sponsorships.findBySponsorshipCode(sponsorship_code);
    const checkUserUsernameExist = await this.usersRepository.findByUsername(username);

    if (checkUserEmailExist) {
      throw new AppError('E-mail address already used.');
    }

    if (checkUserUsernameExist) {
      throw new AppError('Username address already used.', 400);
    }

    if(!terms) {
      throw new AppError('Você não aceitou os termos.', 400);
    }

    if (!username) {
      const randomUsername = `username.${Math.random()
        .toFixed(4)
        .replace('.', '')}${new Date().getTime()}`;
      username = randomUsername;
    }

    if(username.length > 24) {
      throw new AppError('Username só pode ter no máximo 24 caracteres', 400);
    }

    username = username.replace(/\s/g, '');

    if (!name) {
      name = `name.${Math.random().toFixed(4).replace('.', '')}`;
    }

    if(name.length > 30) {
      throw new AppError('O nome só pode ter no máximo 30 caracteres', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if(!isShop) {
      if(!sponsorshipExist || sponsorshipExist.sponsorship_code !== sponsorship_code) {
        throw new AppError('Código de patrocínio inválido ou já usado.', 400);
      }
  
      await this.usersRepository.update(user.id, {
        roles: 'user'
      });

      // Deixa o patrocinio resgatado e indisponivel
      await this.sponsorships.updateSponsorship(sponsorshipExist.sponsor_user_id, {
        sponsored_user_id: user.id,
        redeemed: true,
      });

      // Cria o saldo e adiciona la
      await this.userBalanceRepository.create({
        user_id: user.id,
        total_balance: sponsorshipExist.amount,
      });

      // remove do saldo da loja o valor informado no patrocinio
      await this.userBalanceRepository.update(sponsorshipExist.sponsor_user_id, {
        total_balance: - sponsorshipExist.amount,
      });

      // A loja passa a patrocinar o usuário
      await this.sponsoring.create({
        sponsoring_user_id: sponsorshipExist.sponsor_user_id,
        sponsored_user_id: user.id,
      });

      // Loja fica com +1 patrocinado e o usuário fica com +1 patrocinando ele
      await this.sponsoringSponsoredCount.updateCount(sponsorshipExist.sponsor_user_id, {
        sponsor_count: + 1,
      });

      await this.sponsoringSponsoredCount.updateCount(user.id, {
        sponsored_count: + 1,
      });
    }

    await this.userBalanceRepository.create({
      user_id: user.id,
      total_balance: 0,
    });

    await this.usersRepository.update(user.id, {
      roles: 'shop'
    });

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
