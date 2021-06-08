"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListUsersSponsoredByUser = _interopRequireDefault(require("../../../services/ListUsersSponsoredByUser"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUsersRepository"));

var _PostgresSponsoringRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsoringRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsoredController {
  async index(request, response) {
    const {
      user_id
    } = request.params;
    const usersRepository = new _PostgresUsersRepository.default();
    const sponsoringRepository = new _PostgresSponsoringRepository.default();
    const listUsersSponsoredByUser = new _ListUsersSponsoredByUser.default(usersRepository, sponsoringRepository);
    const sponsored = await listUsersSponsoredByUser.execute(user_id);
    return response.json(sponsored);
  }

}

var _default = SponsoredController;
exports.default = _default;