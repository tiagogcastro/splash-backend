/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import jwtConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  phone_number: string;
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
  constructor(
    private usersRepository: IUsersRepository,
    private userBalanceRepository: IUserBalanceRepository,
  ) {}

  public async execute({ phone_number }: Request): Promise<Response> {
    const checkUserPhoneNumberExists =
      await this.usersRepository.findByPhoneNumber(phone_number);

    if (checkUserPhoneNumberExists) {
      throw new AppError('This phone number already used');
    }

    const user = await this.usersRepository.create({
      phone_number,
      username: createUsername(),
    });

    await this.usersRepository.save(user);

    await this.userBalanceRepository.create({
      user_id: user.id,
    });

    const { secret, expiresIn } = jwtConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
