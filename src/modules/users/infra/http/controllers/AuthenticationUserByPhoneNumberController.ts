import AuthenticateUserByPhoneNumberSession from '@modules/users/services/AuthenticateUserByPhoneNumberSession';
import { Request, Response } from 'express';
import client from 'twilio';
import twilioConfig from '@config/twilio';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

export default class AuthenticationByPhoneNumberController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, phone_number } = request.body;

    const authenticationByPhoneNumber =
      new AuthenticateUserByPhoneNumberSession();

    const { user, token } = await authenticationByPhoneNumber.create({
      phone_number,
      password,
    });

    request.user = {
      id: user.id,
      phone_number: user.phone_number,
    };

    return response.status(200).json({ user, token });
  }
}
