import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import UpdateUserEmailService from './UpdateUserEmailService';

interface Request {
  user_id: string;
  email?: string;
  name?: string;
  bio?: string;
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
    password,
    token,
    username,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const usernameExist = await this.userRepository.findByUsername(username);

    if (usernameExist && usernameExist.username !== username) {
      throw new AppError('This username already exists');
    }
    let userUpdated = user;
    if (email && token && user.email !== email) {
      const updateUserEmail = container.resolve(UpdateUserEmailService);

      userUpdated = await updateUserEmail.execute({
        user_id,
        email,
        token,
      });
    }

    if (password && userUpdated.password !== password) {
      const hashedPassword = await hash(password, 8);

      userUpdated.password = hashedPassword;
    }

    if (name && userUpdated.name !== name) {
      userUpdated.name = name;
    }

    if (bio && userUpdated.bio !== bio) {
      userUpdated.bio = bio;
    }

    if (username && userUpdated.username !== username) {
      userUpdated.username = username;
    }

    await this.userRepository.save(userUpdated);

    return userUpdated;
  }
}

export default UpdateProfileUserService;
