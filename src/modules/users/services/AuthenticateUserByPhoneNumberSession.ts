/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

interface Request {
  phone_number: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserByPhoneNumberSession {
  public async create({ phone_number }: Request): Promise<Response> {
    const { expiresIn, secret } = authConfig.jwt;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { phone_number },
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
