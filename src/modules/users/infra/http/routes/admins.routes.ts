import ensureAdministrator from '@shared/infra/http/middlewares/ensureAdministrator';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UsersEmailController from '../controllers/UsersEmailController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const adminsRoutes = Router();
const usersEmailController = new UsersEmailController();

adminsRoutes.use(ensureAuthenticated, ensureAdministrator);
adminsRoutes.post(
  '/dashboard',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().min(4).max(100).required(),
      password: Joi.when('email', {
        is: Joi.exist(),
        then: Joi.string().min(8).max(100).required(),
      }),
      balance_amount: Joi.number(),
      roles: Joi.string().min(2).max(10).required(),
    },
  }),
  usersEmailController.create,
);
export default adminsRoutes;
