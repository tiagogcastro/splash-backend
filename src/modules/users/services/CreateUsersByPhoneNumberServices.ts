/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import jwtConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';

interface Request {
  phoneNumber: string;
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

export default class CreateUsersByPhoneNumberService {
  public async execute({ phoneNumber }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const checkUserPhoneNumberExists = await usersRepository.findOne({
      where: { phoneNumber },
    });

    if (checkUserPhoneNumberExists) {
      throw new AppError('This phone number already used');
    }

    const user = usersRepository.create({
      phoneNumber,
      username: createUsername(),
    });

    await usersRepository.save(user);

    const { secret, expiresIn } = jwtConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
