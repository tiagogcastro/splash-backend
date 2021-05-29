/* eslint-disable consistent-return */
import { Router } from 'express';
import client from 'twilio';
import twilioConfig from '@config/twilio';

import createUserMiddleware from '@shared/infra/http/middleware/createUserMiddleware';
import UsersPhoneController from '@shared/infra/http/controllers/UsersPhoneController';

const smsRoutes = Router();

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

smsRoutes.post('/', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    await clientSendMessage.verify.services(servicesSid).verifications.create({
      to: `${String(phoneNumber)}`,
      channel: 'sms',
    });

    req.user = {
      id: '',
      phoneNumber,
    };

    return res.json(phoneNumber);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

smsRoutes.post(
  '/validation',
  createUserMiddleware,
  async (request, response) => {
    const userPhone = new UsersPhoneController();

    await userPhone.create(request, response);
  },
);

export default smsRoutes;
