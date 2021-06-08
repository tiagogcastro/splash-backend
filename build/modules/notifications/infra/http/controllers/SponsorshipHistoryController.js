"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListSponsorshipHistoryNotificationsService = _interopRequireDefault(require("../../../services/ListSponsorshipHistoryNotificationsService"));

var _MongoNotificationsRepository = _interopRequireDefault(require("../../typeorm/repositories/MongoNotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsorshipHistoryController {
  async index(request, response) {
    const {
      sender_id
    } = request.params;
    const user_recipient_id = request.user.id;
    const mongoNotificationsRepository = new _MongoNotificationsRepository.default();
    const listSponsorshipHistoryNotifications = new _ListSponsorshipHistoryNotificationsService.default(mongoNotificationsRepository);
    const notifications = await listSponsorshipHistoryNotifications.execute({
      sender_id,
      user_recipient_id
    });
    return response.status(200).json(notifications);
  }

}

exports.default = SponsorshipHistoryController;