import ICreateUserBalanceDTO from '@modules/users/dtos/ICreateUserBalanceDTO';
import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import { getRepository, Repository } from 'typeorm';
import UserBalance from '../entities/UserBalance';

export default class PostgresUserBalanceRepository
  implements IUserBalanceRepository
{
  private ormRepository: Repository<UserBalance>;

  constructor() {
    this.ormRepository = getRepository(UserBalance);
  }

  async findByUserId(user_id: string): Promise<UserBalance | undefined> {
    const userBalance = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });
    return userBalance;
  }

  async create(userBalanceData: ICreateUserBalanceDTO): Promise<UserBalance> {
    const userBalance = this.ormRepository.create(userBalanceData);

    await this.ormRepository.save(userBalance);

    return userBalance;
  }

  async save(userBalance: UserBalance): Promise<UserBalance> {
    return this.ormRepository.save(userBalance);
  }
}
