import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserBalance from '../infra/typeorm/entities/UserBalance';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';

@injectable()
class ShowUserBalanceService {
  constructor(
    @inject('UserBalanceRepository')
    private userBalanceRepository: IUserBalanceRepository,
  ) {}

  async execute(user_id: string): Promise<UserBalance> {
    const user = await this.userBalanceRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError('User does not exist', 400);
    }

    return user;
  }
}

export default ShowUserBalanceService;
