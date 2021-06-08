"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

require("dotenv/config");

require("express-async-errors");

require("../typeorm/connection");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use('/static', _express.default.static(_upload.default.uploadsFolder));
app.use(_rateLimiter.default);
app.use(_routes.default);
app.use((0, _celebrate.errors)());
/**
 *  Global Exception Handler
 */

app.use((error, request, response, _) => {
  if (error instanceof _AppError.default) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
var _default = app;
exports.default = _default;