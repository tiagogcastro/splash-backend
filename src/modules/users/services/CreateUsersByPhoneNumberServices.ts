/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  phoneNumber: string;
}

function createUsername() {
  const username = `username.${uuid()}`;
  return username;
}

export default class CreateUsersByPhoneNumberService {
  public async execute({ phoneNumber }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserPhoneNumberExists = await usersRepository.findOne({
      where: { phoneNumber },
    });

    if (checkUserPhoneNumberExists) {
      throw new AppError('This phone number already used');
    }

    const user = usersRepository.create({
      id: uuid(),
      phoneNumber,
      username: createUsername(),
      name: undefined,
      email: undefined,
      password: undefined,
    });

    await usersRepository.save(user);

    return user;
  }
}
