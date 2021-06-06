import AppError from '@shared/errors/AppError';
import UserBalance from '../infra/typeorm/entities/UserBalance';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';

class ShowUserBalanceService {
  constructor(private userBalanceRepository: IUserBalanceRepository) {}

  async execute(user_id: string): Promise<UserBalance> {
    const user = await this.userBalanceRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError('The user does not exist', 400);
    }

    return user;
  }
}

export default ShowUserBalanceService;
