import ISendNotificationDTO from '@modules/notifications/dtos/ISendNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Notification from '../entities/Notification';

export default class MongoNotificationsRepository
  implements INotificationsRepository
{
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  async create({
    content,
    recipient_id,
  }: ISendNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}
