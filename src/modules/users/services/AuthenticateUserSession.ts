/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

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
  public async create({
    username,
    email,
    password,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const { expiresIn, secret } = authConfig.jwt;

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('E-mail address already used.');
    }

    const passwordVerified = await compare(password, String(user.password));

    if (password && password.length < 6) {
      throw new AppError('A senha precisa ter no mínimo 6 digitos', 401);
    }

    if (!passwordVerified) {
      throw new AppError('Password invalid');
    }

    const token = sign({}, secret, { subject: user.id, expiresIn });

    return {
      user,
      token,
    };
  }
}
