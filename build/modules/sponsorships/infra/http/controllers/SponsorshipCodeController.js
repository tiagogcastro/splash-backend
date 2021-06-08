"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inMemory = _interopRequireDefault(require("../../../in-memory"));

var _CreateSponsorshipCodeService = _interopRequireDefault(require("../../../services/CreateSponsorshipCodeService"));

var _PostgresUserBalanceRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresUserBalanceRepository"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresUsersRepository"));

var _classTransformer = require("class-transformer");

var _PostgresSponsorshipsRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsorshipsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsorshipsController {
  async create(request, response) {
    const sponsor_user_id = request.user.id;
    const {
      allow_withdrawal_balance,
      amount
    } = request.body;
    const postgresSponsorshipsRepository = new _PostgresSponsorshipsRepository.default();
    const postgresUserBalanceRespository = new _PostgresUserBalanceRepository.default();
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const sendSponsorship = new _CreateSponsorshipCodeService.default(postgresUsersRepository, postgresUserBalanceRespository, postgresSponsorshipsRepository);
    const sponsorship = await sendSponsorship.execute({
      allow_withdrawal_balance,
      sponsor_user_id,
      amount
    });
    _inMemory.default.sponsorship = {
      code: sponsorship.sponsorship_code
    };
    return response.status(201).json((0, _classTransformer.classToClass)(sponsorship));
  }

}

exports.default = SponsorshipsController;