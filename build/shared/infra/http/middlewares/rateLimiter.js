"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const limiter = new _rateLimiterFlexible.RateLimiterMemory({
  points: 5,
  duration: 1,
  blockDuration: 3600
});

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch {
    throw new _AppError.default('Too many requests', 429);
  }
}