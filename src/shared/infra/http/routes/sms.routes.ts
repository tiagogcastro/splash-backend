/* eslint-disable consistent-return */
import { Router } from 'express';
import client from 'twilio';
import twilioConfig from '@config/twilio';

import createUserByPhoneNumberMiddleware from '@shared/infra/http/middleware/createUserByPhoneNumberMiddleware';
import UsersPhoneController from '@shared/infra/http/controllers/UsersPhoneController';

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
