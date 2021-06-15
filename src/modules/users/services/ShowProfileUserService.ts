import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class ShowProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);

    if (!user || user.role === 'admin') {
      throw new AppError('User does not exist', 400);
    }

    return user;
  }
}

export default ShowProfileUserService;
