import { Router } from 'express';

import CreateUsersService from '@modules/users/services/CreateUsersService';

const usersRoutes = Router();

usersRoutes.post('/', async (req, res) => {
  // try {
  //   const { name, username, email, password } = await req.body;
  //   const userService = new CreateUsersService();
  //   const user = await userService.execute({
  //     name,
  //     username,
  //     email,
  //     password,
  //   });
  //   const userWithoutPassword = {
  //     id: user.id,
  //     name: user.name,
  //     username: user.username,
  //     email: user.email,
  //     created_at: user.created_at,
  //     updated_at: user.updated_at,
  //   };
  //   res.json(userWithoutPassword);
  // } catch (err) {
  //   res.json({ error: err.message });
  // }
});

export default usersRoutes;
