"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  twilio: {
    accountSid: process.env.TWILLO_ACCOUNT_SID || '*',
    authToken: process.env.TWILLO_AUTH_TOKEN || '*',
    servicesSid: process.env.TWILLO_SERVICES_SID || '*'
  }
};
exports.default = _default;