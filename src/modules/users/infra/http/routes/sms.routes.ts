/* eslint-disable consistent-return */
import { Router } from 'express';

import createUserByPhoneNumberMiddleware from '../middleware/createUserByPhoneNumberMiddleware';
import UsersPhoneController from '../controllers/UsersPhoneController';

const smsRoutes = Router();

const userPhone = new UsersPhoneController();

smsRoutes.post('/', userPhone.sendCode);

smsRoutes.post(
  '/validation',
  createUserByPhoneNumberMiddleware,
  userPhone.create,
);

export default smsRoutes;
