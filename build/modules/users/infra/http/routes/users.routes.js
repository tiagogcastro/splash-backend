"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _QRCodeController = _interopRequireDefault(require("../controllers/QRCodeController"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UsersEmailController = _interopRequireDefault(require("../controllers/UsersEmailController"));

var _UsersPhoneController = _interopRequireDefault(require("../controllers/UsersPhoneController"));

var _createUserByPhoneNumberMiddleware = _interopRequireDefault(require("../middleware/createUserByPhoneNumberMiddleware"));

var _ensureAuthenticated = _interopRequireDefault(require("../middleware/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
const usersEmailController = new _UsersEmailController.default();
const userPhoneController = new _UsersPhoneController.default();
const qrcodeController = new _QRCodeController.default();
const usersController = new _UsersController.default();
usersRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().min(2).max(30),
    email: _celebrate.Joi.string().email().min(4).max(100),
    password: _celebrate.Joi.when('email', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.string().min(8).max(100).required()
    }),
    isShop: _celebrate.Joi.boolean().required(),
    username: _celebrate.Joi.string().min(2).max(30),
    terms: _celebrate.Joi.boolean(),
    sponsorship_code: _celebrate.Joi.string()
  }
}), usersEmailController.create);
usersRoutes.get('/balance-amount', _ensureAuthenticated.default, usersController.show);
usersRoutes.post('/sms/send-code', userPhoneController.sendCode);
usersRoutes.post('/qrcode', qrcodeController.create);
usersRoutes.post('/sms', _createUserByPhoneNumberMiddleware.default, userPhoneController.create);
usersRoutes.put('/add-email', _ensureAuthenticated.default, usersEmailController.update);
var _default = usersRoutes;
exports.default = _default;