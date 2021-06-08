"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensurePayment;

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const limiter = new _rateLimiterFlexible.RateLimiterMemory({
  points: 5,
  duration: 180
});

async function ensurePayment(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch {
    throw new _AppError.default('You can send a sponsorship after 3 minutes', 429);
  }
}