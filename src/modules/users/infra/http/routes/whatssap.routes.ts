import { Router } from 'express';

import client from 'twilio';
import twilioConfig from '@config/twilio';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

const whatssapRoutes = Router();

whatssapRoutes.post('/', (request, response) => {
  clientSendMessage.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: 'Hello World!',
      to: 'whatsapp:+5527988209811',
    })
    .then(message => console.log(message));
});

export default whatssapRoutes;
