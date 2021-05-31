import { Request, Response } from 'express';
import AuthenticateUserSession from '@modules/users/services/AuthenticateUserSession';

export default class AuthenticationController {
  public async create(request: Request, response: Response) {
    const { email, password } = await request.body;

    const userAuthentication = new AuthenticateUserSession();

    const { user, token } = await userAuthentication.create({
      email,
      password,
    });

    request.user = {
      id: user.id,
    };

    return {
      user,
      token,
    };
  }
}
