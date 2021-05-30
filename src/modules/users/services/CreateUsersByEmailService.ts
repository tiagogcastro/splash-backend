/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  name?: string;
  email: string;
  phoneNumber?: string;
  username: string;
  password: string;
}

export default class CreateUsersService {
  public async execute({
    name,
    username,
    email,
    phoneNumber,
    password,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserEmailExist = await usersRepository.findOne({
      where: { email },
    });

    const checkUserUsernameExist = await usersRepository.findOne({
      where: { username },
    });

    const checkUserPhoneNumberExist = await usersRepository.findOne({
      where: { phoneNumber },
    });

    if (checkUserEmailExist) {
      throw new AppError('E-mail address already used.', 400);
    }

    if (checkUserUsernameExist) {
      throw new AppError('Username address already used.', 400);
    }

    if (checkUserPhoneNumberExist) {
      throw new AppError('This phone number address already used.', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      id: uuid(),
      name,
      username,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
