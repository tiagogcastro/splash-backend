import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';

class DeleteProfileUser {
  async execute(user_id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    if(!user) {
      throw new AppError('User not exist', 400);
    }

    await usersRepository.delete(user_id);    
  }
}

export default DeleteProfileUser;