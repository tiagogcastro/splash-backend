import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import IUpdateUserByAdminServiceDTO from '../dtos/IUpdateUserByAdminServiceDTO';
import UserBalance from '../infra/typeorm/entities/UserBalance';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateUserByAdminService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserBalanceRepository')
    private userBalanceRepository: IUserBalanceRepository,
  ) {}

  public async execute({
    user_id,
    balance_amount_add,
    reset_password,
    withdraw_amount,
    roles,
  }: IUpdateUserByAdminServiceDTO): Promise<UserBalance> {
    const user = await this.usersRepository.findById(user_id);

    const userBalance = await this.userBalanceRepository.findByUserId(user_id);

    if (!user) throw new AppError('This user does not exist', 401);
    if (!userBalance)
      throw new AppError('This user balance does not exist', 401);

    if (balance_amount_add && withdraw_amount)
      throw new AppError(
        'You cannot to inform these two attributes together',
        401,
      );

    const defaultValue = 0;

    if (balance_amount_add) {
      userBalance.available_for_withdraw += balance_amount_add;
      userBalance.total_balance += balance_amount_add;
    } else {
      const withdrawAmount = withdraw_amount || defaultValue;

      if (userBalance.available_for_withdraw < withdrawAmount) {
        throw new AppError('The user has no balance', 401);
      }
      userBalance.available_for_withdraw -= withdrawAmount;
      userBalance.total_balance -= withdrawAmount;
    }

    await this.userBalanceRepository.save(userBalance);

    if (reset_password) {
      user.password = await hash(reset_password, 8);
    }

    if (roles) {
      user.roles = roles;
    }

    await this.usersRepository.save(user);

    return userBalance;
  }
}
export default UpdateUserByAdminService;
