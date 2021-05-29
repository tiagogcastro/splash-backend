import ISendNotificationDTO from '../dtos/ISendNotificationDTO';
import Notification from '../infra/entities/Notification';

export default interface INotificationsRepository {
  create(notificationData: ISendNotificationDTO): Promise<Notification>;
}
