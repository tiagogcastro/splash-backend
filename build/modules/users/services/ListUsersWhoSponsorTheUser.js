"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListUsersWhoSponsorTheUser {
  constructor(usersRepository, sponsoringRepository) {
    this.usersRepository = usersRepository;
    this.sponsoringRepository = sponsoringRepository;
  }

  async execute(user_id) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User not logged', 401);
    }

    const usersSponsoring = await this.sponsoringRepository.findAllBySponsoredUserId(user_id);
    return usersSponsoring;
  }

}

var _default = ListUsersWhoSponsorTheUser;
exports.default = _default;