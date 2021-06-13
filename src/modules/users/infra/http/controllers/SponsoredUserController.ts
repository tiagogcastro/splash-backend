import { Request, Response } from 'express';

import ListUsersSponsoredByUser from '@modules/users/services/ListUsersSponsoredByUser';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresSponsoringSponsoredRepository from '../../typeorm/repositories/PostgresSponsoringSponsoredRepository';

class SponsoredController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const postgresUsersRepository = new PostgresUsersRepository();
    const postgresSponsoringSponsoredRepository =
      new PostgresSponsoringSponsoredRepository();

    const listUsersSponsoredByUser = new ListUsersSponsoredByUser(
      postgresUsersRepository,
      postgresSponsoringSponsoredRepository,
    );

    const sponsored = await listUsersSponsoredByUser.execute(user_id);

    return response.json(sponsored);
  }
}

export default SponsoredController;
