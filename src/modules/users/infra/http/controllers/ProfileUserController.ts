import { Request, Response } from 'express';

import UpdateProfileUserService from '@modules/users/services/UpdateProfileUserService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import DeleteProfileUser from '@modules/users/services/DeleteProfileUser';
import { classToClass } from 'class-transformer';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

class ProfileUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const usersRepository = new PostgresUsersRepository();
    const showProfileUser = new ShowProfileUserService(usersRepository);

    const user = await showProfileUser.execute(username);

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      username,
      password,
      bio,
      password_confirmation,
      email,
      name,
    } = request.body;
    const usersRepository = new PostgresUsersRepository();
    const updateProfile = new UpdateProfileUserService(usersRepository);

    const userUpdated = await updateProfile.execute({
      user_id,
      username,
      password,
      password_confirmation,
      email,
      bio,
      name,
    });

    return response.json(classToClass(userUpdated));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const usersRepository = new PostgresUsersRepository();
    const deleteProfile = new DeleteProfileUser(usersRepository);

    await deleteProfile.execute(user_id);

    return response.status(204).send();
  }
}

export default ProfileUserController;
