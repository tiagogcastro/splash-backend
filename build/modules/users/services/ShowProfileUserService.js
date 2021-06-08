"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowProfileUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(username) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new _AppError.default('User not exist', 400);
    }

    return user;
  }

}

var _default = ShowProfileUserService;
exports.default = _default;