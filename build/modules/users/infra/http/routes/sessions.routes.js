"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AuthenticationByEmailController = _interopRequireDefault(require("../controllers/AuthenticationByEmailController"));

var _celebrate = require("celebrate");

var _AuthenticationUserByPhoneNumberController = _interopRequireDefault(require("../controllers/AuthenticationUserByPhoneNumberController"));

var _createUserByPhoneNumberMiddleware = _interopRequireDefault(require("../middleware/createUserByPhoneNumberMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRoutes = (0, _express.Router)();
const userValidationController = new _AuthenticationUserByPhoneNumberController.default();
const authenticateUser = new _AuthenticationByEmailController.default();
sessionsRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().min(4).max(100).required(),
    password: _celebrate.Joi.when('email', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.string().required().min(8).max(100)
    })
  }
}), authenticateUser.create);
sessionsRoutes.post('/sms', _createUserByPhoneNumberMiddleware.default, userValidationController.create);
var _default = sessionsRoutes;
exports.default = _default;