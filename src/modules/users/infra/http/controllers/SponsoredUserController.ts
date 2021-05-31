import { Request, Response } from 'express';

import ListUsersSponsoredByUser from '@modules/users/services/ListUsersSponsoredByUser';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import PostgresSponsoringRepository from '../../typeorm/repositories/PostgresSponsoringRepository';

class SponsoredController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const usersRepository = new PostgresUsersRepository();
    const sponsoringRepository = new PostgresSponsoringRepository();
    const listUsersSponsoredByUser = new ListUsersSponsoredByUser(
      usersRepository,
      sponsoringRepository,
    );

    const sponsored = await listUsersSponsoredByUser.execute(user_id);

    return response.json(sponsored);
  }
}

export default SponsoredController;
