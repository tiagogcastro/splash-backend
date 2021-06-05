import { celebrate, Joi, Segments } from 'celebrate';
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

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().min(4).max(100),
      password: Joi.when('email', {
        is: Joi.exist(),
        then: Joi.string().min(8).max(100).required(),
      }),
      username: Joi.string().min(2).max(30),
      sponsorship_code: Joi.string().min(2).max(30).required(),
      terms: Joi.boolean(),
    },
  }),
  usersEmailController.create,
);
usersRoutes.get('/balance-amount', ensureAuthenticated, usersController.show);

usersRoutes.post('/sms/send-code', userPhoneController.sendCode);

usersRoutes.post(
  '/sms',
  createUserByPhoneNumberMiddleware,
  userPhoneController.create,
);

export default usersRoutes;
