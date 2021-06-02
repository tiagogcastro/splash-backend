import AuthenticateUserSession from '@modules/users/services/AuthenticateUserByEmailSession';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

export default class AuthenticationByEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = await request.body;
    const userAuthentication = new AuthenticateUserSession();

    const { user, token } = await userAuthentication.create({
      email,
      password,
    });

    request.user = {
      id: user.id,
    };

    return response.status(200).json({
      user: classToClass(user),
      token,
    });
  }
}
