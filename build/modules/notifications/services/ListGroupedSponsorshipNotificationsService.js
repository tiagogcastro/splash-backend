"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListGroupedSponsorshipNotificationsService {
  constructor(notificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }

  async execute(user_id) {
    const notifications = await this.notificationsRepository.findAllNotificationsByUser(user_id);
    const senders = [];
    const groupedNotifications = notifications.filter(notification => {
      const sender_id = senders.find(sender => sender === notification.sender_id);
      if (sender_id) return false;
      senders.push(notification.sender_id);
      return true;
    });
    return groupedNotifications;
  }

}

exports.default = ListGroupedSponsorshipNotificationsService;