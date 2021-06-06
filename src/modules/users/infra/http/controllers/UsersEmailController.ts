import { classToClass } from 'class-transformer';
import CreateUsersService from '@modules/users/services/CreateUsersByEmailService';
import { Request, Response } from 'express';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresUserBalanceRepository from '../../typeorm/repositories/PostgresUserBalanceRepository';
import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import PostgresSponsoringRepository from '../../typeorm/repositories/PostgresSponsoringRepository';
import PostgresSponsoringSponsoredCountRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredCountRepository';


class UsersEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, sponsorship_code, terms, isShop } = request.body;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresUserBalanceRepository = new PostgresUserBalanceRepository();
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();
    const postgresSponsoringRepository = new PostgresSponsoringRepository();
    const postgresSponsoringSponsoredCountRepository = new PostgresSponsoringSponsoredCountRepository();

    const createUser = new CreateUsersService(
      postgresUsersRepository,
      postgresUserBalanceRepository,
      postgresSponsorshipsRepository,
      postgresSponsoringRepository,
      postgresSponsoringSponsoredCountRepository
    );

    const { user, token } = await createUser.execute({
      name,
      username,
      email,
      password,
      sponsorship_code,
      terms,
      isShop
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }
}

export default UsersEmailController;
