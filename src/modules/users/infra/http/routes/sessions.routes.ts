import { Router } from 'express';

import AuthenticationByEmailController from '@modules/users/infra/http/controllers/AuthenticationByEmailController';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthenticationByPhoneNumberController from '../controllers/AuthenticationUserByPhoneNumberController';

const sessionsRouter = Router();

const authenticationByPhoneNumberController =
  new AuthenticationByPhoneNumberController();
const authenticateUser = new AuthenticationByEmailController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(100).required(),
      password: Joi.when('email', {
        is: Joi.exist(),
        then: Joi.string().required().min(8).max(100),
      }),
    },
  }),
  authenticateUser.create,
);

sessionsRouter.post(
  '/sms',
  celebrate({
    [Segments.BODY]: {
      phone_number: Joi.string()
        .min(8)
        .max(15)
        .regex(/^\+[0-9]+$/i),
      password: Joi.when('phone_number', {
        is: Joi.exist(),
        then: Joi.string().required().min(8).max(100),
      }),
    },
  }),
  authenticationByPhoneNumberController.create,
);
export default sessionsRouter;
