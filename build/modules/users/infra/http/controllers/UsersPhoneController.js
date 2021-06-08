"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateUsersByPhoneNumberServices = _interopRequireDefault(require("../../../services/CreateUsersByPhoneNumberServices"));

var _twilio = _interopRequireDefault(require("twilio"));

var _twilio2 = _interopRequireDefault(require("../../../../../config/twilio"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUsersRepository"));

var _PostgresUserBalanceRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUserBalanceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  accountSid,
  authToken,
  servicesSid
} = _twilio2.default.twilio;
const clientSendMessage = (0, _twilio.default)(accountSid, authToken);

class UsersPhoneController {
  async sendCode(request, response) {
    try {
      const {
        phone_number
      } = request.body;
      await clientSendMessage.verify.services(servicesSid).verifications.create({
        to: `${String(phone_number)}`,
        channel: 'sms'
      });
      request.user = {
        id: '',
        phone_number
      };
      return response.json({
        message: 'Code sent successfully!'
      });
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

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
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const postgresUserBalanceRepository = new _PostgresUserBalanceRepository.default();
    const createUserByPhoneNumber = new _CreateUsersByPhoneNumberServices.default(postgresUsersRepository, postgresUserBalanceRepository);
    const {
      user,
      token
    } = await createUserByPhoneNumber.execute({
      phone_number
    });
    request.user = {
      id: user.id,
      phone_number: user.phone_number
    };
    return response.status(201).json({
      user,
      token
    });
  }

  async validation(request, response) {
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
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const postgresUserBalanceRepository = new _PostgresUserBalanceRepository.default();
    const createUserByPhoneNumber = new _CreateUsersByPhoneNumberServices.default(postgresUsersRepository, postgresUserBalanceRepository);
    const {
      user,
      token
    } = await createUserByPhoneNumber.execute({
      phone_number
    });
    request.user = {
      id: user.id,
      phone_number: user.phone_number
    };
    return response.status(201).json({
      user,
      token
    });
  }

}

var _default = UsersPhoneController;
exports.default = _default;