"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticateUserByEmailSession = _interopRequireDefault(require("../../../services/AuthenticateUserByEmailSession"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthenticationByEmailController {
  async create(request, response) {
    const {
      email,
      password
    } = await request.body;
    const userAuthentication = new _AuthenticateUserByEmailSession.default();
    const {
      user,
      token
    } = await userAuthentication.create({
      email,
      password
    });
    request.user = {
      id: user.id
    };
    return response.status(200).json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = AuthenticationByEmailController;