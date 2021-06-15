import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Notification from '../infra/typeorm/schemas/Notification';
import INotificationRepository from '../repositories/INotificationRepository';

interface IListSponsorshipHistoryNotificationsDTO {
  user_recipient_id: string;
  sender_id: string;
}

@injectable()
export default class ListSponsorshipHistoryNotificationsService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    sender_id,
    user_recipient_id,
  }: IListSponsorshipHistoryNotificationsDTO): Promise<Notification[]> {
    const notifications =
      await this.notificationRepository.findAllSponsorshipHistoryNotifications({
        recipient_id: user_recipient_id,
        sender_id,
      });
    const user = await this.userRepository.findById(sender_id);

    if (!user) throw new AppError('User does not exist');

    const notificationsWithSender = notifications.map(notification => {
      return {
        ...notification,
        sender: classToClass(user),
      };
    });

    return notificationsWithSender;
  }
}
