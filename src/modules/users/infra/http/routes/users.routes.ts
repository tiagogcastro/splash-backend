import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import QRCodeController from '../controllers/QRCodeController';
import UsersController from '../controllers/UsersController';
import UsersEmailController from '../controllers/UsersEmailController';
import UsersPhoneController from '../controllers/UsersPhoneController';
import createUserByPhoneNumberMiddleware from '../middleware/createUserByPhoneNumberMiddleware';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import ensureLimitedCodeRequests from '../middleware/ensureLimitedCodeRequests';
import smsRateLimit from '../middleware/smsRateLimiter';

const usersRoutes = Router();

const usersEmailController = new UsersEmailController();
const userPhoneController = new UsersPhoneController();
const qrcodeController = new QRCodeController();
const usersController = new UsersController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(1).max(30),
      email: Joi.string().email().max(100),
      password: Joi.when('email', {
        is: Joi.exist(),
        then: Joi.string().min(8).max(100).required(),
      }),
      username: Joi.string()
        .regex(/^[A-Z0-9_.]+$/i)
        .min(1)
        .max(30),
      terms: Joi.boolean(),
      sponsorship_code: Joi.string(),
    },
  }),
  usersEmailController.create,
);

usersRoutes.get('/balance-amount', ensureAuthenticated, usersController.show);

usersRoutes.post(
  '/sms/send-code',
  ensureLimitedCodeRequests,
  userPhoneController.sendCode,
);

usersRoutes.post('/qrcode', qrcodeController.create);

usersRoutes.post(
  '/sms',
  createUserByPhoneNumberMiddleware,
  userPhoneController.create,
);

export default usersRoutes;
