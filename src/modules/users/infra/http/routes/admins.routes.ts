import NotificationsController from '@modules/notifications/infra/http/controllers/NotificationsController';
import ensureAdministrator from '@shared/infra/http/middlewares/ensureAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AdminsController from '../controllers/AdminsController';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const adminsRoutes = Router();
const usersController = new UsersController();
const adminsController = new AdminsController();
const notificationsController = new NotificationsController();

adminsRoutes.use(ensureAuthenticated, ensureAdministrator);
adminsRoutes.post(
  '/dashboard/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().min(4).max(100),
      username: Joi.string()
        .regex(/^[A-Z0-9_.]+$/i)
        .min(1)
        .max(30),
      password: Joi.when('email', {
        is: Joi.exist(),
        then: Joi.string().min(8).max(100).required(),
      }),
      phone_number: Joi.string()
        .regex(/^[0-9]+$/)
        .min(8)
        .max(15)
        .when('email', {
          not: Joi.exist(),
          then: Joi.string().required(),
        }),
      balance_amount: Joi.number(),
      role: Joi.string().min(2).max(10),
    },
  }),
  usersController.create,
);

adminsRoutes.put(
  '/dashboard/users',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      withdraw_amount: Joi.number(),
      reset_password: Joi.string().min(8).max(100),
      balance_amount_add: Joi.number(),
      role: Joi.string().min(2).max(10),
    },
  }),
  adminsController.update,
);

adminsRoutes.get('/dashboard/users', usersController.index);
adminsRoutes.get('/dashboard/notifications', notificationsController.index);

export default adminsRoutes;
