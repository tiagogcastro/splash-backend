"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _celebrate = require("celebrate");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ProfileUserController = _interopRequireDefault(require("../controllers/ProfileUserController"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middleware/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.default.multer);
const profileRoutes = (0, _express.Router)();
const profileUserController = new _ProfileUserController.default();
const userAvatarController = new _UserAvatarController.default();
profileRoutes.use(_ensureAuthenticated.default);
profileRoutes.get('/:username', profileUserController.show);
profileRoutes.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().min(2).max(30),
    email: _celebrate.Joi.string().email().min(4).max(100),
    username: _celebrate.Joi.string().min(2).max(30),
    // bio: Joi.string().min(2).max(80),
    // old_password: Joi.string(),
    password: _celebrate.Joi.when('email', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.string().required()
    }),
    password_confirmation: _celebrate.Joi.when('password', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
    })
  }
}), profileUserController.update);
profileRoutes.patch('/avatar', upload.single('avatar'), userAvatarController.update);
profileRoutes.delete('/', profileUserController.delete);
var _default = profileRoutes;
exports.default = _default;