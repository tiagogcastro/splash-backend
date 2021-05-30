import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';

class ShowProfileUserService {
  async execute(username: string): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {username}
    });

    if(!user) {
      throw new AppError('User not exist', 400);
    }

    return user;
  }
}

export default ShowProfileUserService;