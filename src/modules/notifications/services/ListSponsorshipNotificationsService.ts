import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Notification from '../infra/typeorm/schemas/Notification';
import INotificationRepository from '../repositories/INotificationRepository';

@injectable()
export default class ListSponsorshipNotificationsService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user_id: string): Promise<Notification[]> {
    const notifications =
      await this.notificationRepository.findAllNotificationsByUser(user_id);

    const senders: string[] = [];
    const groupedNotifications = notifications.filter(notification => {
      const sender_id = senders.find(
        sender => sender === notification.sender_id,
      );
      if (sender_id) return false;
      senders.push(notification.sender_id);

      return true;
    });

    const promises = groupedNotifications.map(async notification => {
      const user = await this.userRepository.findById(notification.sender_id);

      if (!user) throw new AppError('User does not exist');

      return {
        ...notification,
        sender: classToClass(user),
      };
    });
    const notificationsWithSender = await Promise.all(promises);

    return notificationsWithSender;
  }
}
