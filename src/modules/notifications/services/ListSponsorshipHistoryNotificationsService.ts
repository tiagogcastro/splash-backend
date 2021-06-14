import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import Notification from '../infra/typeorm/schemas/Notification';
import INotificationRepository from '../repositories/INotificationRepository';

interface IListSponsorshipHistoryNotificationsDTO {
  user_recipient_id: string;
  sender_id: string;
}
export default class ListSponsorshipHistoryNotificationsService {
  constructor(
    private notificationRepository: INotificationRepository,
    private usersRepository: IUsersRepository,
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
    const user = await this.usersRepository.findById(sender_id);

    if (!user) throw new AppError('User does not exist');

    const notificationsWithSender = notifications.map(notification => {
      return {
        ...notification,
        sender: user,
      };
    });

    return notificationsWithSender;
  }
}
