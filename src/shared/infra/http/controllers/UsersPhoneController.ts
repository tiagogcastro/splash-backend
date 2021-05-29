import CreateUsersByPhoneNumberService from '@modules/users/services/CreateUsersByPhoneNumberServices';
import { Request, Response } from 'express';

import client from 'twilio';
import twilioConfig from '@config/twilio';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

class UsersPhoneController {
  async create(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const { phoneNumber } = request.user;

    if (!phoneNumber) {
      return response.status(400).json({ error: 'User number is missing' });
    }

    const verifyCode = await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: String(code),
      })
      .catch(error => {
        return response.status(404).json({ error });
      });

    const createUserByPhoneNumber = new CreateUsersByPhoneNumberService();
    const user = await createUserByPhoneNumber.execute({ phoneNumber });

    return response.json(user);
  }
}

export default UsersPhoneController;
