"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUserByPhoneNumberMiddleware;

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUserByPhoneNumberMiddleware(req, res, next) {
  const {
    userPhone
  } = req.query;

  if (!userPhone) {
    throw new _AppError.default('User number is missing', 401);
  }

  req.user = {
    id: '',
    phone_number: String(userPhone)
  };
  return next();
}