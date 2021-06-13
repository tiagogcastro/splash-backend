import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowProfileUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('User does not exist', 400);
    }

    return user;
  }
}

export default ShowProfileUserService;
