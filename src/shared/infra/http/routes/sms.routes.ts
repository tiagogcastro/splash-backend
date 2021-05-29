/* eslint-disable consistent-return */
import { Router } from 'express';
import client from 'twilio';
import twilioConfig from '@config/twilio';

import createUserMiddleware from '@shared/infra/http/middleware/createUserMiddleware';
import UsersPhoneController from '@shared/infra/http/controllers/UsersPhoneController';

const smsRoutes = Router();

const userPhone = new UsersPhoneController();

smsRoutes.post('/', async (request, response) => {
  await userPhone.sendCode(request, response);
});

smsRoutes.post(
  '/validation',
  createUserMiddleware,
  async (request, response) => {
    await userPhone.create(request, response);
  },
);

export default smsRoutes;
