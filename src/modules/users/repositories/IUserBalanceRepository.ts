import ICreateUserBalanceDTO from '../dtos/ICreateUserBalanceDTO';
import IUpdateUserBalanceDTO from '../dtos/IUpdateUserBalanceDTO';
import UserBalance from '../infra/typeorm/entities/UserBalance';

export default interface IUserBalanceRepository {
  create(userData: ICreateUserBalanceDTO): Promise<UserBalance>;
  findByUserId(user_id: string): Promise<UserBalance | undefined>;
  save(userBalanceData: UserBalance): Promise<UserBalance>;
  update(
    user_id: string,
    data: IUpdateUserBalanceDTO,
  ): Promise<UserBalance | undefined>;
}
