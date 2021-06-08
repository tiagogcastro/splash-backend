"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteProfileUser {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user_id) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User not exist', 400);
    }

    await this.usersRepository.deleteById(user_id);
  }

}

var _default = DeleteProfileUser;
exports.default = _default;