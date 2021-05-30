import CreateUsersService from '@modules/users/services/CreateUsersByEmailService';
import { Request, Response } from 'express';

class UsersEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, username, phoneNumber, email, password } = await request.body;

    const userService = new CreateUsersService();

    const user = await userService.execute({
      name,
      username,
      email,
      phoneNumber,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }
}

export default UsersEmailController;
