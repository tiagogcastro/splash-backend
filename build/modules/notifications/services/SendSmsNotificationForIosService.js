"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _twilio = _interopRequireDefault(require("../../../config/twilio"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _twilio2 = _interopRequireDefault(require("twilio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  accountSid,
  authToken
} = _twilio.default.twilio;
const clientSendMessage = (0, _twilio2.default)(accountSid, authToken);

class SendSmsNotificationForIosService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async sendNotification({
    user_id,
    message
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User does not found');
    }

    const userPhoneNumber = String(user === null || user === void 0 ? void 0 : user.phone_number);
    const sendMessageForUser = await clientSendMessage.messages.create({
      body: String(message),
      from: '+15625260048',
      to: userPhoneNumber
    });
    return {
      message: sendMessageForUser.body
    };
  }

}

exports.default = SendSmsNotificationForIosService;