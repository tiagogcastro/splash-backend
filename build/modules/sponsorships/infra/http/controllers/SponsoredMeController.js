"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SearchSponsoredFromUserService = _interopRequireDefault(require("../../../services/SearchSponsoredFromUserService"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../../../users/infra/typeorm/repositories/PostgresUsersRepository"));

var _classTransformer = require("class-transformer");

var _PostgresSponsorshipsRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsorshipsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SponsoredMeController {
  async index(request, response) {
    const {
      username
    } = request.query;
    const sponsor_id = request.user.id;
    const postgresSponsorshipsRepository = new _PostgresSponsorshipsRepository.default();
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const searchSponsoredFromUser = new _SearchSponsoredFromUserService.default(postgresSponsorshipsRepository, postgresUsersRepository);
    const sponsorships = await searchSponsoredFromUser.execute({
      username: String(username),
      sponsor_id
    });
    return response.status(200).json((0, _classTransformer.classToClass)(sponsorships));
  }

}

exports.default = SponsoredMeController;