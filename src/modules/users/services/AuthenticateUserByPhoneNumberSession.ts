/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { getRepository } from 'typeorm';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  phoneNumber: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserByPhoneNumberSession {
  public async create({ phoneNumber }: Request): Promise<Response> {
    const { expiresIn, secret } = authConfig.jwt;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { phoneNumber },
    });

    if (!user) {
      throw new AppError('User does not exist');
    }
    const token = sign({}, secret, { subject: user.id, expiresIn });

    return {
      user,
      token,
    };
  }
}
