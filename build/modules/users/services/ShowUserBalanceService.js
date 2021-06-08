"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowUserBalanceService {
  constructor(userBalanceRepository) {
    this.userBalanceRepository = userBalanceRepository;
  }

  async execute(user_id) {
    const user = await this.userBalanceRepository.findByUserId(user_id);

    if (!user) {
      throw new _AppError.default('The user does not exist', 400);
    }

    return user;
  }

}

var _default = ShowUserBalanceService;
exports.default = _default;