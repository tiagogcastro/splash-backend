"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SponsorUserService = _interopRequireDefault(require("../../../services/SponsorUserService"));

var _UnSponsoringUserService = _interopRequireDefault(require("../../../services/UnSponsoringUserService"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUsersRepository"));

var _PostgresSponsoringRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsoringRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsoringController {
  async update(request, response) {
    const {
      sponsoring_userId,
      sponsored_userId
    } = request.body;
    const usersRepository = new _PostgresUsersRepository.default();
    const sponsoringRepository = new _PostgresSponsoringRepository.default();
    const sponsoringUser = new _SponsorUserService.default(usersRepository, sponsoringRepository);
    const sponsor = await sponsoringUser.execute(sponsoring_userId, sponsored_userId);
    return response.json(sponsor);
  }

  async delete(request, response) {
    const {
      user_id_to_remove_sponsor,
      user_id_to_remove_sponsored
    } = request.body;
    const usersRepository = new _PostgresUsersRepository.default();
    const sponsoringRepository = new _PostgresSponsoringRepository.default();
    const UnsponsoringUser = new _UnSponsoringUserService.default(usersRepository, sponsoringRepository);
    await UnsponsoringUser.execute(user_id_to_remove_sponsor, user_id_to_remove_sponsored);
    return response.status(204).send();
  }

}

var _default = SponsoringController;
exports.default = _default;