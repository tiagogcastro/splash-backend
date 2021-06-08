"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  const {
    authorization
  } = request.headers;
  if (!authorization) throw new _AppError.default('JWT token is missing.', 401);
  const [, token] = authorization.split(' ');
  const {
    secret
  } = _auth.default.jwt;

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, secret);
    const {
      sub
    } = decoded;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token', 401);
  }
}