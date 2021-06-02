import Notification from '../infra/typeorm/schemas/Notification';
import INotificationsRepository from '../repositories/INotificationsRepository';

interface IListSponsorshipHistoryNotificationsDTO {
  user_recipient_id: string;
  sender_id: string;
}
export default class ListSponsorshipHistoryNotificationsService {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    sender_id,
    user_recipient_id,
  }: IListSponsorshipHistoryNotificationsDTO): Promise<Notification[]> {
    const notifications =
      await this.notificationsRepository.findAllSponsorshipHistoryNotifications(
        {
          recipient_id: user_recipient_id,
          sender_id,
        },
      );

    return notifications;
  }
}
