import ShowUserBalanceService from '@modules/users/services/ShowUserBalanceService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';

class UsersController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();

    const showUserBalance = new ShowUserBalanceService(
      postgresUserBalanceRepository,
    );
    const userBalance = await showUserBalance.execute(user_id);

    return response.status(200).json(classToClass(userBalance));
  }
}

export default UsersController;
