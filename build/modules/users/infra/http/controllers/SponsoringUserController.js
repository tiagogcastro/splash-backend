"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListUsersWhoSponsorTheUser = _interopRequireDefault(require("../../../services/ListUsersWhoSponsorTheUser"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUsersRepository"));

var _PostgresSponsoringRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsoringRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListSponsoringController {
  async index(request, response) {
    const {
      user_id
    } = request.params;
    const usersRepository = new _PostgresUsersRepository.default();
    const sponsoringRepository = new _PostgresSponsoringRepository.default();
    const listUsersWhoSponsorTheUser = new _ListUsersWhoSponsorTheUser.default(usersRepository, sponsoringRepository);
    const sponsoring = await listUsersWhoSponsorTheUser.execute(user_id);
    return response.json(sponsoring);
  }

}

var _default = ListSponsoringController;
exports.default = _default;