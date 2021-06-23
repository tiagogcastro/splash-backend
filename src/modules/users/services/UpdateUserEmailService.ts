import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface Resquest {
  user_id: string;
  email: string;
  token?: string;
}

@injectable()
export default class UpdateUserEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ user_id, email, token }: Resquest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 401);

    if (user.email !== email) {
      const checkEmailAlreadyExists = await this.userRepository.findByEmail(
        email,
      );

      if (checkEmailAlreadyExists) {
        throw new AppError('This email already exists');
      }

      if (!token)
        throw new AppError(
          'You need to inform a token to update your email',
          401,
        );

      const userTokens = await this.userTokensRepository.findValidToken({
        token,
        user_id,
        email,
      });

      if (!userTokens)
        throw new AppError('This token is invalid or does not exist', 401);

      const limitDate = addHours(userTokens.created_at, 12);

      if (isAfter(Date.now(), limitDate))
        throw new AppError('Token expired', 401);

      userTokens.active = false;

      await this.userTokensRepository.save(userTokens);

      user.email = email;

      await this.userRepository.save(user);
    }

    return user;
  }
}
