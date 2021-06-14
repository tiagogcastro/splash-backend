import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

@injectable()
class ShowProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError('User does not exist', 400);
    }

    return user;
  }
}

export default ShowProfileUserService;
