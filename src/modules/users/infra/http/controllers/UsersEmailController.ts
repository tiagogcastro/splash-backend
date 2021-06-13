import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import AddEmailAndPasswordUserService from '@modules/users/services/AddEmailAndPasswordUserService';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

class UsersEmailController {
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
