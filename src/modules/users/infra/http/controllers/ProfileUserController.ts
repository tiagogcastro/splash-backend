import { Request, Response } from 'express';

import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import DeleteProfileUser from '@modules/users/services/DeleteProfileUser';

class ProfileUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const showProfileUser = new ShowProfileUserService();

    const user = await showProfileUser.execute(username);

    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const deleteProfile = new DeleteProfileUser();

    await deleteProfile.execute(user_id);

    return response.status(204).send();
  }
}

export default ProfileUserController;