/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  username?: string;
  email?: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserSession {
  constructor(private usersRepository: IUsersRepository) {}

  public async create({ email, password }: Request): Promise<Response> {
    const { expiresIn, secret } = authConfig.jwt;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail address already used.');
    }

    const passwordMatched = await compare(password, String(user.password));

    if (password && password.length < 6) {
      throw new AppError('A senha precisa ter no mínimo 6 digitos', 401);
    }

    if (!passwordMatched) {
      throw new AppError('Password invalid');
    }

    const token = sign({}, secret, { subject: user.id, expiresIn });

    return {
      user,
      token,
    };
  }
}
