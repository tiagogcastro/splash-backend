import twilioConfig from '@config/twilio';
import { Request, Response } from 'express';
import client from 'twilio';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

class SendCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { phone_number } = request.body;

      await clientSendMessage.verify
        .services(servicesSid)
        .verifications.create({
          to: `+${String(phone_number)}`,
          channel: 'sms',
        });

      request.user = {
        id: '',
        phone_number,
      };

      return response.json({ message: 'Code sent successfully!' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default SendCodeController;
