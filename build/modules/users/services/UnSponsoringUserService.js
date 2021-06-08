"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnSponsoringUserService {
  constructor(usersRepository, sponsoringRepository) {
    this.usersRepository = usersRepository;
    this.sponsoringRepository = sponsoringRepository;
  }

  async execute(user_id_to_remove_sponsor, user_id_to_remove_sponsored) {
    const userLogged = await this.usersRepository.findById(user_id_to_remove_sponsor);
    const userToUnSponsoring = await this.usersRepository.findById(user_id_to_remove_sponsored);

    if (!userLogged) {
      throw new _AppError.default('User not logged', 401);
    }

    if (!userToUnSponsoring) {
      throw new _AppError.default('User not exist', 401);
    }

    const sponsoringExist = await this.sponsoringRepository.findBySponsoringAndSponsored(user_id_to_remove_sponsor, user_id_to_remove_sponsored);

    if (sponsoringExist) {
      await this.sponsoringRepository.deleteById(sponsoringExist.id);
    }
  }

}

var _default = UnSponsoringUserService;
exports.default = _default;