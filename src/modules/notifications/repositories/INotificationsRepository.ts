import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import IFindAllSponsorshipNotificationsDTO from '../dtos/IFindAllSponsorshipNotificationsDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(notificationData: ICreateNotificationDTO): Promise<Notification>;
  findAllNotificationsByUser(recipient_id: string): Promise<Notification[]>;
  findAllNotifications(): Promise<Notification[]>;
  findAllSponsorshipHistoryNotifications(
    notificationData: IFindAllSponsorshipNotificationsDTO,
  ): Promise<Notification[]>;
}
