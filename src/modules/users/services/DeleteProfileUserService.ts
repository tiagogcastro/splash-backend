import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class DeleteProfileUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 400);
    }

    await this.userRepository.deleteById(user_id);
  }
}

export default DeleteProfileUser;
