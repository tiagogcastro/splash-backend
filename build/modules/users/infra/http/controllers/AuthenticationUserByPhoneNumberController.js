"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticateUserByPhoneNumberSession = _interopRequireDefault(require("../../../services/AuthenticateUserByPhoneNumberSession"));

var _twilio = _interopRequireDefault(require("twilio"));

var _twilio2 = _interopRequireDefault(require("../../../../../config/twilio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  accountSid,
  authToken,
  servicesSid
} = _twilio2.default.twilio;
const clientSendMessage = (0, _twilio.default)(accountSid, authToken);

class AuthenticationByPhoneNumberController {
  async create(request, response) {
    const {
      code
    } = request.body;
    const {
      phone_number
    } = request.user;

    if (!phone_number) {
      return response.status(400).json({
        error: 'User number is missing'
      });
    }

    await clientSendMessage.verify.services(servicesSid).verificationChecks.create({
      to: phone_number,
      code: String(code)
    }).catch(error => {
      return response.status(404).json({
        error
      });
    });
    const authenticationByPhoneNumber = new _AuthenticateUserByPhoneNumberSession.default();
    const {
      user,
      token
    } = await authenticationByPhoneNumber.create({
      phone_number
    });
    request.user = {
      id: user.id,
      phone_number: user.phone_number
    };
    return response.status(200).json({
      user,
      token
    });
  }

}

exports.default = AuthenticationByPhoneNumberController;