"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListGroupedSponsorshipNotificationsService = _interopRequireDefault(require("../../../services/ListGroupedSponsorshipNotificationsService"));

var _SendSmsNotificationForIosService = _interopRequireDefault(require("../../../services/SendSmsNotificationForIosService"));

var _MongoNotificationsRepository = _interopRequireDefault(require("../../typeorm/repositories/MongoNotificationsRepository"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationsController {
  async index(request, response) {
    const user_id = request.user.id;
    const mongoNotificationsRepository = new _MongoNotificationsRepository.default();
    const listGroupedSponsorshipNotifications = new _ListGroupedSponsorshipNotificationsService.default(mongoNotificationsRepository);
    const notifications = await listGroupedSponsorshipNotifications.execute(user_id);
    return response.status(200).json(notifications);
  }

  async sendNotificationForIos(request, response) {
    const user_id = request.user.id;
    const {
      message
    } = await request.body;
    const usersRepository = new _PostgresUsersRepository.default();
    const sendSmsNotificationForIos = new _SendSmsNotificationForIosService.default(usersRepository);
    const notifications = await sendSmsNotificationForIos.sendNotification({
      user_id,
      message
    });
    return response.status(200).json(notifications);
  }

}

exports.default = NotificationsController;