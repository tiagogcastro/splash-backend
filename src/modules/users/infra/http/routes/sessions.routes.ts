import { Router } from 'express';

import AuthenticationController from '@modules/users/infra/http/controllers/AuthenticationController';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const authenticateUser = new AuthenticationController();

  const { user, token } = await authenticateUser.create(request, response);

  response.json({ user, token });
});

export default sessionsRoutes;
