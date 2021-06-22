import twilioConfig from '@config/twilio';
import AppError from '@shared/errors/AppError';
import client, { Twilio } from 'twilio';
import IVerifyCodeDTO from '../dtos/IVerifyCodeDTO';
import ISMSProvider from '../models/ISMSProvider';

export default class TwilloSMSProvider implements ISMSProvider {
  private clientSendMessage: Twilio;

  private servicesSid: string;

  constructor() {
    const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

    const clientSendMessage = client(accountSid, authToken);

    this.clientSendMessage = clientSendMessage;
    this.servicesSid = servicesSid;
  }

  async sendCode(to: string): Promise<void> {
    try {
      await this.clientSendMessage.verify
        .services(this.servicesSid)
        .verifications.create({
          to: `+${to}`,
          channel: 'sms',
        });
    } catch {
      throw new AppError(
        'It looks like there was an error regarding the code sent',
      );
    }
  }

  async verifyCode({ to, code }: IVerifyCodeDTO): Promise<void> {
    try {
      await this.clientSendMessage.verify
        .services(this.servicesSid)
        .verificationChecks.create({
          to: `+${to}`,
          code,
        });
    } catch {
      throw new AppError(
        'It looks like there was an error regarding the code verification',
      );
    }
  }
}
