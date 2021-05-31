import { Request, Response } from 'express';
import AuthenticateUserSession from '@modules/users/services/AuthenticateUserSession';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

export default class AuthenticationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = await request.body;
    const usersRepository = new PostgresUsersRepository();
    const userAuthentication = new AuthenticateUserSession(usersRepository);

    const { user, token } = await userAuthentication.create({
      email,
      password,
    });

    request.user = {
      id: user.id,
    };

    return response.status(200).json({
      user,
      token,
    });
  }
}
