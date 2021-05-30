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
  username?: string;
  password: string;
}

export default class CreateUsersService {
  public async execute({
    name,
    username,
    email,
    password,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserEmailExist = await usersRepository.findOne({
      where: { email },
    });

    const checkUserUsernameExist = await usersRepository.findOne({
      where: { username },
    });

    if (checkUserEmailExist) {
      throw new AppError('E-mail address already used.', 400);
    }

    if (checkUserUsernameExist) {
      throw new AppError('Username address already used.', 400);
    }

    if(!username) {
      const randomUsername= `username.${Math.random().toFixed(4).replace('.', '')}${new Date().getTime()}`;
      username = randomUsername;      
    }
    
    username = username.replace(/\s/g, '');

    if(!name) {
      name = `name.${Math.random().toFixed(4).replace('.', '')}`
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      id: uuid(),
      name: name || `name.lavimco-${Math.random().toFixed(4)}`,
      username,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
