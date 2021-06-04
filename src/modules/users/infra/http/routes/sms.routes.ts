/* eslint-disable consistent-return */
import { Router } from 'express';

import createUserByPhoneNumberMiddleware from '../middleware/createUserByPhoneNumberMiddleware';
import UsersPhoneController from '../controllers/UsersPhoneController';
import AuthenticationByPhoneNumberController from '../controllers/AuthenticationUserByPhoneNumberController';

const smsRoutes = Router();

const userPhone = new UsersPhoneController();
const userValidationController = new AuthenticationByPhoneNumberController();

smsRoutes.post('/sendcode', userPhone.sendCode);

smsRoutes.post('/create', createUserByPhoneNumberMiddleware, userPhone.create);

smsRoutes.post(
  '/authenticate',
  createUserByPhoneNumberMiddleware,
  userValidationController.create,
);

export default smsRoutes;
