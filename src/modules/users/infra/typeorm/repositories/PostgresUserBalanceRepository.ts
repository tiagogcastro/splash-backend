import ICreateUserBalanceDTO from '@modules/users/dtos/ICreateUserBalanceDTO';
import IUpdateUserBalanceDTO from '@modules/users/dtos/IUpdateUserBalanceDTO';
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

  async update(user_id: string, data: IUpdateUserBalanceDTO): Promise<UserBalance | undefined> {
    const userBalance = await this.ormRepository.update(user_id, data);

    if(userBalance.affected === 1) {
      const userBalanceUpdated = await this.ormRepository.findOne(user_id);

      return userBalanceUpdated;
    }
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
