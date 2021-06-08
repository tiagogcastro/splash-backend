"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MongoNotificationsRepository = _interopRequireDefault(require("../../../../notifications/infra/typeorm/repositories/MongoNotificationsRepository"));

var _SendSponsorshipService = _interopRequireDefault(require("../../../services/SendSponsorshipService"));

var _PostgresSponsorBalanceRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresSponsorBalanceRepository"));

var _PostgresUserBalanceRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresUserBalanceRepository"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresUsersRepository"));

var _classTransformer = require("class-transformer");

var _PostgresSponsorshipsRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsorshipsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsorshipsController {
  async create(request, response) {
    const sponsor_user_id = request.user.id;
    const {
      user_recipient_id,
      allow_withdrawal_balance,
      amount
    } = request.body;
    const mongoNotificationsRepository = new _MongoNotificationsRepository.default();
    const postgresSponsorshipsRepository = new _PostgresSponsorshipsRepository.default();
    const postgresUserBalanceRespository = new _PostgresUserBalanceRepository.default();
    const postgresSponsorBalanceRespository = new _PostgresSponsorBalanceRepository.default();
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const sendSponsorship = new _SendSponsorshipService.default(postgresUsersRepository, postgresUserBalanceRespository, postgresSponsorshipsRepository, postgresSponsorBalanceRespository, mongoNotificationsRepository);
    const sponsorship = await sendSponsorship.execute({
      user_recipient_id,
      sponsor_user_id,
      allow_withdrawal_balance,
      amount
    });
    return response.status(201).json((0, _classTransformer.classToClass)(sponsorship));
  }

}

exports.default = SponsorshipsController;