"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListSponsorshipHistoryNotificationsService {
  constructor(notificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }

  async execute({
    sender_id,
    user_recipient_id
  }) {
    const notifications = await this.notificationsRepository.findAllSponsorshipHistoryNotifications({
      recipient_id: user_recipient_id,
      sender_id
    });
    return notifications;
  }

}

exports.default = ListSponsorshipHistoryNotificationsService;