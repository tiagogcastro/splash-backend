"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListUsersSponsoredByUser {
  constructor(usersRepository, sponsoringRepository) {
    this.usersRepository = usersRepository;
    this.sponsoringRepository = sponsoringRepository;
  }

  async execute(user_id) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User not logged', 401);
    }

    const usersSponsored = await this.sponsoringRepository.findAllBySponsoringUserId(user_id);
    return usersSponsored;
  }

}

var _default = ListUsersSponsoredByUser;
exports.default = _default;