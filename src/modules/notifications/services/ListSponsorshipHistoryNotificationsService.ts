import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Notification from '../infra/typeorm/schemas/Notification';
import INotificationRepository from '../repositories/INotificationRepository';

interface IListSponsorshipHistoryNotificationsDTO {
  user_recipient_id: string;
  user_id: string;
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
    user_id,
    user_recipient_id,
  }: IListSponsorshipHistoryNotificationsDTO): Promise<Notification[]> {
    const notifications =
      await this.notificationRepository.findAllSponsorshipHistoryNotifications({
        recipient_id: user_recipient_id,
        user_id,
      });
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist');

    const notificationsWithUser = notifications.map(notification => {
      return {
        ...notification,
        user: classToClass(user),
      };
    });

    return notificationsWithUser;
  }
}
