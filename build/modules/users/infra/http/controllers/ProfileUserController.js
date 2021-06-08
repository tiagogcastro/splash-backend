"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateProfileUserService = _interopRequireDefault(require("../../../services/UpdateProfileUserService"));

var _ShowProfileUserService = _interopRequireDefault(require("../../../services/ShowProfileUserService"));

var _DeleteProfileUser = _interopRequireDefault(require("../../../services/DeleteProfileUser"));

var _classTransformer = require("class-transformer");

var _PostgresUsersRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileUserController {
  async show(request, response) {
    const {
      username
    } = request.params;
    const usersRepository = new _PostgresUsersRepository.default();
    const showProfileUser = new _ShowProfileUserService.default(usersRepository);
    const user = await showProfileUser.execute(username);
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const {
      user_id,
      username,
      password,
      password_confirmation,
      email,
      name
    } = request.body;
    const usersRepository = new _PostgresUsersRepository.default();
    const updateProfile = new _UpdateProfileUserService.default(usersRepository);
    const userUpdated = await updateProfile.execute({
      user_id,
      username,
      password,
      password_confirmation,
      email,
      name
    });
    return response.json((0, _classTransformer.classToClass)(userUpdated));
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const usersRepository = new _PostgresUsersRepository.default();
    const deleteProfile = new _DeleteProfileUser.default(usersRepository);
    await deleteProfile.execute(user_id);
    return response.status(204).send();
  }

}

var _default = ProfileUserController;
exports.default = _default;