import { Router } from 'express';

import UsersEmailController from '@shared/infra/http/controllers/UsersEmailController';

const usersRoutes = Router();

<<<<<<< HEAD
usersRoutes.post('/', async (req, res) => {
  try {
    const { name, username, email, password } = await req.body;
    const userService = new CreateUsersService();
    const user = await userService.execute({
      name,
      username,
      email,
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
    res.json(userWithoutPassword);
  } catch (err) {
    res.json({ error: err.message });
  }
=======
usersRoutes.post('/', async (request, response) => {
  const usersEmail = new UsersEmailController();

  usersEmail.create(request, response);
>>>>>>> 5a23fea89c6c1577e9554ad0f53b316cd545740a
});

export default usersRoutes;
