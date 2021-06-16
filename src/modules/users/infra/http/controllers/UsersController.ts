import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserBalanceService from '@modules/users/services/ShowUserBalanceService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUserRepository';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const postgresUsersRepository = new PostgresUsersRepository();

    const users = await postgresUsersRepository.findAllUsers();

    return response.status(200).json(classToClass(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      username,
      role,
      verification_code,
      phone_number,
      balance_amount,
      sponsorship_code,
      terms,
    } = await request.body;

    const createUser = container.resolve(CreateUserService);

    const { user, token } = await createUser.execute({
      name,
      username,
      email,
      phone_number,
      role,
      verification_code,
      balance_amount,
      password,
      sponsorship_code,
      terms,
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserBalance = container.resolve(ShowUserBalanceService);

    const userBalance = await showUserBalance.execute(user_id);

    return response.status(200).json(classToClass(userBalance));
  }
}

export default UsersController;
