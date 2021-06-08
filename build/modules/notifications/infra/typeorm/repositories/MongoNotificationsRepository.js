"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Notification = _interopRequireDefault(require("../schemas/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MongoNotificationsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Notification.default, 'mongo');
  }

  async findAllSponsorshipHistoryNotifications({
    recipient_id,
    sender_id
  }) {
    const notifications = await this.ormRepository.find({
      where: {
        recipient_id,
        sender_id
      },
      order: {
        created_at: 'DESC'
      }
    });
    return notifications;
  }

  async findAllNotificationsByUser(recipient_id) {
    const notifications = await this.ormRepository.find({
      where: {
        recipient_id
      },
      order: {
        created_at: 'DESC'
      }
    });
    return notifications;
  }

  async create({
    content,
    recipient_id,
    sender_id
  }) {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
      sender_id
    });
    await this.ormRepository.save(notification);
    return notification;
  }

}

exports.default = MongoNotificationsRepository;