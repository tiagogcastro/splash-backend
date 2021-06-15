import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import client from 'twilio';
import twilioConfig from '@config/twilio';

import IUpdateUserByAdminServiceDTO from '../dtos/IUpdateUserByAdminServiceDTO';
import UserBalance from '../infra/typeorm/entities/UserBalance';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

const { accountSid, authToken, servicesSid } = twilioConfig.twilio;

const clientSendMessage = client(accountSid, authToken);

interface Resquest {
  user_id: string;
  phone_number: string;
  verification_code: string;
}

@injectable()
export default class UpdateUserPhoneNumberService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async sendCode(phone_number: string): Promise<void> {
    await clientSendMessage.verify.services(servicesSid).verifications.create({
      to: `+${String(phone_number)}`,
      channel: 'sms',
    });
  }

  async validationAndUpdateUserPhoneNumber({
    user_id,
    phone_number,
    verification_code,
  }: Resquest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('This user does not exist', 401);

    await clientSendMessage.verify
      .services(servicesSid)
      .verificationChecks.create({
        to: `+${phone_number}`,
        code: String(verification_code),
      })
      .catch(error => {
        throw new AppError(error);
      });

    user.phone_number = phone_number;

    await this.userRepository.save(user);

    return user;
  }
}
