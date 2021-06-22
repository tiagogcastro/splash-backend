import twilioConfig from '@config/twilio';
import ISMSProvider from '@shared/container/providers/SMSProvider/models/ISMSProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import client from 'twilio';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

interface Resquest {
  user_id: string;
  phone_number: string;
  verification_code: string;
}

@injectable()
export default class UpdateUserPhoneService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SMSProvider')
    private smsProvider: ISMSProvider,
  ) {}

  async sendCode(phone_number: string): Promise<void> {
    await this.smsProvider.sendCode(phone_number);
  }

  async validationAndUpdateUserPhoneNumber({
    user_id,
    phone_number,
    verification_code,
  }: Resquest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('This user does not exist', 401);

    await this.smsProvider.verifyCode({
      to: phone_number,
      code: verification_code,
    });

    user.phone_number = phone_number;

    await this.userRepository.save(user);

    return user;
  }
}
