/* eslint-disable consistent-return */
import { Router } from 'express';

import createUserByPhoneNumberMiddleware from '../middleware/createUserByPhoneNumberMiddleware';
import UsersPhoneController from '../controllers/UsersPhoneController';

const smsRoutes = Router();

const userPhone = new UsersPhoneController();

smsRoutes.post('/', async (request, response) => {
  await userPhone.sendCode(request, response);
});

smsRoutes.post(
  '/validation',
  createUserByPhoneNumberMiddleware,
  async (request, response) => {
    await userPhone.create(request, response);
  },
);

export default smsRoutes;
