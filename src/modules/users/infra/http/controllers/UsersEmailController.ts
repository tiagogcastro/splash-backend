import { classToClass } from 'class-transformer';
import CreateUsersService from '@modules/users/services/CreateUsersByEmailService';
import { Request, Response } from 'express';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';

class UsersEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password } = await request.body;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();

    const createUser = new CreateUsersService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
    );

    const { user, token } = await createUser.execute({
      name,
      username,
      email,
      password,
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }
}

export default UsersEmailController;
