"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _CreateUsersByEmailService = _interopRequireDefault(require("../../../services/CreateUsersByEmailService"));

var _PostgresSponsorshipsRepository = _interopRequireDefault(require("../../../../sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository"));

var _AddEmailAndPasswordUserService = _interopRequireDefault(require("../../../services/AddEmailAndPasswordUserService"));

var _PostgresUsersRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUsersRepository"));

var _PostgresUserBalanceRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUserBalanceRepository"));

var _PostgresSponsoringRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsoringRepository"));

var _PostgresSponsoringSponsoredCountRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsoringSponsoredCountRepository"));

var _PostgresSponsorBalanceRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresSponsorBalanceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersEmailController {
  async create(request, response) {
    const {
      name,
      username,
      email,
      password,
      sponsorship_code,
      terms,
      isShop
    } = await request.body;
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const postgresUserBalanceRepository = new _PostgresUserBalanceRepository.default();
    const postgresSponsorBalanceRepository = new _PostgresSponsorBalanceRepository.default();
    const postgresSponsorshipsRepository = new _PostgresSponsorshipsRepository.default();
    const postgresSponsoringRepository = new _PostgresSponsoringRepository.default();
    const postgresSponsoringSponsoredCountRepository = new _PostgresSponsoringSponsoredCountRepository.default();
    const createUser = new _CreateUsersByEmailService.default(postgresUsersRepository, postgresUserBalanceRepository, postgresSponsorBalanceRepository, postgresSponsorshipsRepository, postgresSponsoringRepository, postgresSponsoringSponsoredCountRepository);
    const {
      user,
      token
    } = await createUser.execute({
      name,
      username,
      email,
      password,
      sponsorship_code,
      terms,
      isShop
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      email,
      password,
      password_confirmation
    } = await request.body;
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const addEmailAndPassword = new _AddEmailAndPasswordUserService.default(postgresUsersRepository);
    const user = await addEmailAndPassword.execute({
      user_id,
      email,
      password,
      password_confirmation
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user)
    });
  }

}

var _default = UsersEmailController;
exports.default = _default;