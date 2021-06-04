import AuthenticateUserByPhoneNumberSession from '@modules/users/services/AuthenticateUserByPhoneNumberSession';
import { Request, Response } from 'express';
import client from 'twilio';
import twilioConfig from '@config/twilio';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

export default class AuthenticationByPhoneNumberController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const { phone_number } = request.user;

    if (!phone_number) {
      return response.status(400).json({ error: 'User number is missing' });
    }

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: phone_number,
        code: String(code),
      })
      .catch(error => {
        return response.status(404).json({ error });
      });

    const authenticationByPhoneNumber =
      new AuthenticateUserByPhoneNumberSession();

    const { user, token } = await authenticationByPhoneNumber.create({
      phone_number,
    });

    request.user = {
      id: user.id,
      phone_number: user.phone_number,
    };

    return response.status(200).json({ user, token });
  }
}
