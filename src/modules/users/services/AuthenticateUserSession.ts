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
  public async execute({ username, email, password }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const { expiresIn, secret } = authConfig.jwt;

    function createUserToken(userID: string) {
      const token = sign({}, secret, { subject: userID, expiresIn });

      return token;
    }

    async function VerifyUserPassword(userPassword: string) {
      const passwordVerified = await compare(password, userPassword);

      return passwordVerified;
    }

    const UserFoundByUsername = await usersRepository.findOne({
      where: { username },
    });
    const UserFoundByEmail = await usersRepository.findOne({
      where: { email },
    });

    if (!UserFoundByUsername) {
      throw new AppError('Username is already used.');
    }

    if (!UserFoundByEmail) {
      throw new AppError('E-mail address already used.');
    }
  }
}
