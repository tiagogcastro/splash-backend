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

    const users: string[] = [];
    const groupedNotifications = notifications.filter(notification => {
      const userIdFinded = users.find(user => user === notification.user_id);

      if (userIdFinded) return false;

      users.push(notification.user_id);

      return true;
    });

    const promises = groupedNotifications.map(async notification => {
      const user = await this.userRepository.findById(notification.user_id);

      if (!user) throw new AppError('User does not exist');

      return {
        ...notification,
        user: classToClass(user),
      };
    });
    const notificationsWithUser = await Promise.all(promises);

    return notificationsWithUser;
  }
}
