import UpdateUserByAdminService from '@modules/users/services/UpdateUserByAdminService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

class AdminsController {
  async update(request: Request, response: Response): Promise<Response> {
    const { user_id, balance_amount_add, roles, withdraw_amount } =
      request.body;
    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();

    const updateUserByAdmin = new UpdateUserByAdminService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
    );
    const userBalance = await updateUserByAdmin.execute({
      user_id,
      balance_amount_add,
      roles,
      withdraw_amount,
    });

    return response.status(200).json(classToClass(userBalance));
  }
}

export default AdminsController;
