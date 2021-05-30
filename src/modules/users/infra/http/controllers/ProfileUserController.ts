import { Request, Response } from 'express';

import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';

class ProfileUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const showProfileUser = new ShowProfileUserService();

    const user = await showProfileUser.execute(username);

    return response.json(user);
  }
}

export default ProfileUserController;