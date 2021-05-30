import ISendNotificationDTO from '../dtos/ISendNotificationDTO';
import Notification from '../infra/schemas/Notification';

export default interface INotificationsRepository {
  create(notificationData: ISendNotificationDTO): Promise<Notification>;
}
