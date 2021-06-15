import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import Notification from '../infra/typeorm/schemas/Notification';
import INotificationRepository from '../repositories/INotificationRepository';

export default class ListGroupedSponsorshipNotificationsService {
  constructor(
    private notificationRepository: INotificationRepository,
    private usersRepository: IUsersRepository,
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

    const notificationsWithSenderParsed = groupedNotifications.map(
      notification => {
        return {
          ...notification,
          sender: JSON.parse(notification.sender),
        };
      },
    );

    return notificationsWithSenderParsed;
  }
}
