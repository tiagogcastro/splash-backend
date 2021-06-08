import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

class DeleteProfileUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not exist', 400);
    }

    await this.usersRepository.deleteById(user_id);
  }
}

export default DeleteProfileUser;
