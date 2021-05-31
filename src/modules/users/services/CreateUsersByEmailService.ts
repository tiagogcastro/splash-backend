/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import jwtConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name?: string;
  email: string;
  username?: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class CreateUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    username,
    email,
    password,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const checkUserEmailExist = await this.usersRepository.findByEmail(email);

    const checkUserUsernameExist = await usersRepository.findOne({
      where: { username },
    });

    if (checkUserEmailExist) {
      throw new AppError('E-mail address already used.');
    }

    if (checkUserUsernameExist) {
      throw new AppError('Username address already used.', 400);
    }

    if (!username) {
      const randomUsername = `username.${Math.random()
        .toFixed(4)
        .replace('.', '')}${new Date().getTime()}`;
      username = randomUsername;
    }

    username = username.replace(/\s/g, '');

    if (!name) {
      name = `name.${Math.random().toFixed(4).replace('.', '')}`;
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name: name || `name.lavimco-${Math.random().toFixed(4)}`,
      username,
      email,
      password: hashedPassword,
    });

    const { secret, expiresIn } = jwtConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    await usersRepository.save(user);

    return {
      user,
      token,
    };
  }
}
