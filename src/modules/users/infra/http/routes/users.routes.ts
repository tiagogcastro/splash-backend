import { Router } from 'express';

import UsersEmailController from '../controllers/UsersEmailController';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  const usersEmail = new UsersEmailController();

  usersEmail.create(request, response);
});

export default usersRoutes;
