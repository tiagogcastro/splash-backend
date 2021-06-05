import { Router } from 'express';

import AuthenticationByEmailController from '@modules/users/infra/http/controllers/AuthenticationByEmailController';
import AuthenticationByPhoneNumberController from '../controllers/AuthenticationUserByPhoneNumberController';
import createUserByPhoneNumberMiddleware from '../middleware/createUserByPhoneNumberMiddleware';

const sessionsRoutes = Router();

const userValidationController = new AuthenticationByPhoneNumberController();
const authenticateUser = new AuthenticationByEmailController();

sessionsRoutes.post('/', authenticateUser.create);

sessionsRoutes.post(
  '/sms',
  createUserByPhoneNumberMiddleware,
  userValidationController.create,
);
export default sessionsRoutes;
