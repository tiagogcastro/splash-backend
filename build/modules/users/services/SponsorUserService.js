"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsorUserService {
  constructor(usersRepository, sponsoringRepository) {
    this.usersRepository = usersRepository;
    this.sponsoringRepository = sponsoringRepository;
  }

  async execute(sponsoring_userId, sponsored_userId) {
    const userLogged = await this.usersRepository.findById(sponsoring_userId);
    const userToSponsor = await this.usersRepository.findById(sponsored_userId);

    if (!userLogged) {
      throw new _AppError.default('User not logged', 401);
    }

    if (!userToSponsor) {
      throw new _AppError.default('User not exist', 401);
    }

    const sponsoringExist = await this.sponsoringRepository.findBySponsoringAndSponsored(sponsoring_userId, sponsored_userId);

    if (sponsoringExist) {
      return sponsoringExist;
    }

    const sponsorUser = await this.sponsoringRepository.create({
      sponsoring_userId,
      sponsored_userId
    });
    return sponsorUser;
  }

}

var _default = SponsorUserService;
exports.default = _default;