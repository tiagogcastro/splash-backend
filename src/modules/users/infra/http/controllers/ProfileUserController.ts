import { Request, Response } from 'express';
import mailConfig from '@config/mail';
import UpdateProfileUserService from '@modules/users/services/UpdateProfileUserService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import DeleteProfileUserService from '@modules/users/services/DeleteProfileUserService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

class ProfileUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const showProfileUser = container.resolve(ShowProfileUserService);

    const user = await showProfileUser.execute(username);

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { username, password, old_password, bio, email, token, name } =
      request.body;
    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileUserService);

    const userUpdated = await updateProfile.execute({
      user_id,
      username,
      password,
      old_password,
      token,
      email,
      bio,
      name,
    });

    return response.json(classToClass(userUpdated));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const deleteProfile = container.resolve(DeleteProfileUserService);

    await deleteProfile.execute(user_id);

    return response.status(204).send();
  }
}

export default ProfileUserController;
