"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowUserBalanceService = _interopRequireDefault(require("../../../services/ShowUserBalanceService"));

var _classTransformer = require("class-transformer");

var _PostgresUserBalanceRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUserBalanceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async show(request, response) {
    const user_id = request.user.id;
    const postgresUserBalanceRepository = new _PostgresUserBalanceRepository.default();
    const showUserBalance = new _ShowUserBalanceService.default(postgresUserBalanceRepository);
    const userBalance = await showUserBalance.execute(user_id);
    return response.status(200).json((0, _classTransformer.classToClass)(userBalance));
  }

}

var _default = UsersController;
exports.default = _default;