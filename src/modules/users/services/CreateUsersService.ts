import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  username: string;
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

    const checkUserEmail = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserEmail) {
      throw new AppError('Email address already used.', 400);
    }

    const checkUserName = await usersRepository.findOne({
      where: { username },
    });

    if (checkUserName) {
      throw new AppError('Username address already used.', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      id: uuid(),
      name,
      username,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
