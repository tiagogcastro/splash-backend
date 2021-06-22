import TwilloSWSProvider from '@shared/container/providers/SMSProvider/implementations/TwilloSMSProvider';
import { Request, Response } from 'express';

class SendCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { phone_number } = request.body;

    const smsProvider = new TwilloSWSProvider();

    await smsProvider.sendCode(phone_number);

    request.user = {
      id: '',
      phone_number,
    };

    return response.status(200).json({
      status: 'success',
      message: 'code sent successfully',
    });
  }
}

export default SendCodeController;
