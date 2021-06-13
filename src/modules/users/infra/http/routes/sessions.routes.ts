import { Router } from 'express';

import AuthenticationByEmailController from '@modules/users/infra/http/controllers/AuthenticationByEmailController';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthenticationByPhoneNumberController from '../controllers/AuthenticationUserByPhoneNumberController';
import createUserByPhoneNumberMiddleware from '../middleware/createUserByPhoneNumberMiddleware';

const sessionsRoutes = Router();

const authenticationByPhoneNumberController =
  new AuthenticationByPhoneNumberController();
const authenticateUser = new AuthenticationByEmailController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().min(4).max(100).required(),
      password: Joi.when('email', {
        is: Joi.exist(),
        then: Joi.string().required().min(8).max(100),
      }),
    },
  }),
  authenticateUser.create,
);

sessionsRoutes.post(
  '/sms',
  celebrate({
    [Segments.BODY]: {
      phone_number: Joi.string().regex(/^[0-9]+$/i),
      password: Joi.when('phone_number', {
        is: Joi.exist(),
        then: Joi.string().required().min(8).max(100),
      }),
    },
  }),
  createUserByPhoneNumberMiddleware,
  authenticationByPhoneNumberController.create,
);
export default sessionsRoutes;
