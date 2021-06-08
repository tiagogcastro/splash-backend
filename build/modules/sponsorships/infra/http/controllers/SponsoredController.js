"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListShopBalanceAmountService = _interopRequireDefault(require("../../../services/ListShopBalanceAmountService"));

var _PostgresSponsorBalanceRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresSponsorBalanceRepository"));

var _PostgresUserBalanceRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresUserBalanceRepository"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsoredController {
  async index(request, response) {
    const user_id = request.user.id;
    const postgresSponsorBalanceRepository = new _PostgresSponsorBalanceRepository.default();
    const postgresUserBalanceRepository = new _PostgresUserBalanceRepository.default();
    const listShopBalanceAmount = new _ListShopBalanceAmountService.default(postgresSponsorBalanceRepository, postgresUserBalanceRepository);
    const sponsorships = await listShopBalanceAmount.execute(user_id);
    return response.status(200).json((0, _classTransformer.classToClass)(sponsorships));
  }

}

exports.default = SponsoredController;