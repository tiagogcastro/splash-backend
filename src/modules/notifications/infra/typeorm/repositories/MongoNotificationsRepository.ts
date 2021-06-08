import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import IFindAllSponsorshipNotificationsDTO from '@modules/notifications/dtos/IFindAllSponsorshipNotificationsDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Notification from '../schemas/Notification';

export default class MongoNotificationsRepository
  implements INotificationsRepository
{
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  async findAllSponsorshipHistoryNotifications({
    recipient_id,
    sender_id,
  }: IFindAllSponsorshipNotificationsDTO): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({
      where: {
        recipient_id,
        sender_id,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return notifications;
  }

  async findAllNotificationsByUser(
    recipient_id: string,
  ): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({
      where: {
        recipient_id,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return notifications;
  }

  async create({
    content,
    recipient_id,
    sender_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
      sender_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}
