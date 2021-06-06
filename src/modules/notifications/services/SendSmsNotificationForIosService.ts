import twilioConfig from '@config/twilio';
import AppError from '@shared/errors/AppError';
import client from 'twilio';

import IUsersRepository from '../../users/repositories/IUsersRepository';

const { accountSid, authToken } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

interface Request {
  user_id: string;
  message: string;
}

interface Response {
  message: string;
}

export default class SendSmsNotificationForIosService {
  constructor(private usersRepository: IUsersRepository) {}

  public async sendNotification({
    user_id,
    message,
  }: Request): Promise<Response> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not found');
    }

    const userPhoneNumber = String(user?.phone_number);

    const sendMessageForUser = await clientSendMessage.messages.create({
      body: String(message),
      from: '+15625260048',
      to: userPhoneNumber,
    });

    return {
      message: sendMessageForUser.body,
    };
  }
}
