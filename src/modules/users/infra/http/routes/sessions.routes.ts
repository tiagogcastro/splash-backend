import { Router } from 'express';

import AuthenticationByEmailController from '@modules/users/infra/http/controllers/AuthenticationByEmailController';

const sessionsRoutes = Router();

const authenticateUser = new AuthenticationByEmailController();

sessionsRoutes.post('/', authenticateUser.create);

export default sessionsRoutes;
