import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import AddEmailAndPasswordUserService from '@modules/users/services/AddEmailAndPasswordUserService';
import PostgresUserRepository from '../../typeorm/repositories/PostgresUserRepository';

class UsersEmailController {
  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { email, password, password_confirmation } = await request.body;

    const postgresUserRepository = new PostgresUserRepository();
    const addEmailAndPassword = new AddEmailAndPasswordUserService(
      postgresUserRepository,
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
