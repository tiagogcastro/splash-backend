import { classToClass } from 'class-transformer';
import CreateUsersService from '@modules/users/services/CreateUsersByEmailService';
import { Request, Response } from 'express';
import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import AddEmailAndPasswordUserService from '@modules/users/services/AddEmailAndPasswordUserService';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';
import PostgresSponsoringRepository from '../../typeorm/repositories/PostgresSponsoringRepository';
import PostgresSponsoringSponsoredCountRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredCountRepository';
import PostgresSponsorBalanceRepository from '../../typeorm/repositories/PostgresSponsorBalanceRepository';

class UsersEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, sponsorship_code, terms, isShop } =
      await request.body;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();
    const postgresSponsorBalanceRepository =
      new PostgresSponsorBalanceRepository();
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresSponsoringRepository = new PostgresSponsoringRepository();
    const postgresSponsoringSponsoredCountRepository =
      new PostgresSponsoringSponsoredCountRepository();
    const createUser = new CreateUsersService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
      postgresSponsorBalanceRepository,
      postgresSponsorshipsRepository,
      postgresSponsoringRepository,
      postgresSponsoringSponsoredCountRepository,
    );

    const { user, token } = await createUser.execute({
      name,
      username,
      email,
      password,
      sponsorship_code,
      terms,
      isShop,
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { email, password, password_confirmation } = await request.body;

    const postgresUsersRepository = new PostgresUsersRepository();
    const addEmailAndPassword = new AddEmailAndPasswordUserService(
      postgresUsersRepository,
    );

    const user = await addEmailAndPassword.execute({
      user_id,
      email,
      password,
      password_confirmation,
    });

    return response.json({
      user: classToClass(user),
    });
  }
}

export default UsersEmailController;
