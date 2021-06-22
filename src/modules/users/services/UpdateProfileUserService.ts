import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import UpdateUserEmailService from './UpdateUserEmailService';

interface Request {
  user_id: string;
  email?: string;
  name?: string;
  bio?: string;
  old_password?: string;
  token?: string;
  password?: string;
  username?: string;
}
@injectable()
class UpdateProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    email,
    name,
    bio,
    old_password,
    password,
    token,
    username,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const usernameExist = await this.userRepository.findByUsername(username);

    if (usernameExist && usernameExist.username !== username) {
      throw new AppError('This username already exists', 401);
    }

    if (password && !old_password) {
      throw new AppError('You need to inform your old password', 401);
    }

    if (old_password) {
      const passwordMatched = compare(old_password, user.password);

      if (!passwordMatched) {
        throw new AppError('Old password not matched', 401);
      }
    }

    const updateUserEmail = container.resolve(UpdateUserEmailService);

    await updateUserEmail.execute({
      user_id,
      email,
      token,
    });

    if (password && user.password !== password) {
      const hashedPassword = await hash(password, 8);

      user.password = hashedPassword;
    }

    if (name && user.name !== name) {
      user.name = name;
    }

    if (bio && user.bio !== bio) {
      user.bio = bio;
    }

    if (username && user.username !== username) {
      user.username = username;
    }

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileUserService;
