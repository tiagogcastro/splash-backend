import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';
import IUpdateProfileUserServiceDTO from '../dtos/IUpdateProfileUserServiceDTO';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import UpdateUserEmailService from './UpdateUserEmailService';

@injectable()
class UpdateProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    name,
    bio,
    password,
    token,
    username,
  }: IUpdateProfileUserServiceDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const checkUsernameAlreadyExists = await this.userRepository.findByUsername(
      username,
    );

    if (
      checkUsernameAlreadyExists &&
      checkUsernameAlreadyExists.username !== username
    ) {
      throw new AppError('This username already exists');
    }

    let userUpdated = user;
    if (token) {
      const updateUserEmail = container.resolve(UpdateUserEmailService);

      userUpdated = await updateUserEmail.execute({
        user_id,
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
