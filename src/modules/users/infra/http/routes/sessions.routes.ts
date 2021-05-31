import { Router } from 'express';

import AuthenticationController from '@modules/users/infra/http/controllers/AuthenticationController';

const sessionsRoutes = Router();

const authenticateUser = new AuthenticationController();

sessionsRoutes.post('/', authenticateUser.create);

export default sessionsRoutes;
