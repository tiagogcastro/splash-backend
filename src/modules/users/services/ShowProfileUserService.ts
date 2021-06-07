import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

class ShowProfileUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('User not exist', 400);
    }

    return user;
  }
}

export default ShowProfileUserService;
