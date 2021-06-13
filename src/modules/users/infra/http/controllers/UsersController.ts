import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserBalanceService from '@modules/users/services/ShowUserBalanceService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PostgresSponsorBalanceRepository from '../../typeorm/repositories/PostgresSponsorBalanceRepository';
import PostgresSponsoringSponsoredRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUserSponsoringSponsoredCountRepository from '../../typeorm/repositories/PostgresUserSponsoringSponsoredCountRepository';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      username,
      roles,
      phone_number,
      balance_amount,
      sponsorship_code,
      terms,
    } = await request.body;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();
    const postgresSponsorBalanceRepository =
      new PostgresSponsorBalanceRepository();
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresSponsoringSponsoredRepository =
      new PostgresSponsoringSponsoredRepository();
    const postgresUserSponsoringSponsoredCountRepository =
      new PostgresUserSponsoringSponsoredCountRepository();
    const createUser = new CreateUserService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
      postgresSponsorBalanceRepository,
      postgresSponsorshipsRepository,
      postgresSponsoringSponsoredRepository,
      postgresUserSponsoringSponsoredCountRepository,
    );

    const { user, token } = await createUser.execute({
      name,
      username,
      email,
      phone_number,
      roles,
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
