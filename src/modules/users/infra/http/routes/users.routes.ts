import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UsersEmailController from '../controllers/UsersEmailController';
import UsersPhoneController from '../controllers/UsersPhoneController';
import createUserByPhoneNumberMiddleware from '../middleware/createUserByPhoneNumberMiddleware';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRoutes = Router();

const usersEmailController = new UsersEmailController();
const userPhoneController = new UsersPhoneController();
const usersController = new UsersController();

usersRoutes.post('/', usersEmailController.create);
usersRoutes.get('/balance-amount', ensureAuthenticated, usersController.show);

usersRoutes.post('/sms/send-code', userPhoneController.sendCode);

usersRoutes.post(
  '/sms',
  createUserByPhoneNumberMiddleware,
  userPhoneController.create,
);

export default usersRoutes;
