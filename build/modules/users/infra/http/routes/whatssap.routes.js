"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _twilio = _interopRequireDefault(require("twilio"));

var _twilio2 = _interopRequireDefault(require("../../../../../config/twilio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  accountSid,
  authToken,
  servicesSid
} = _twilio2.default.twilio;
const clientSendMessage = (0, _twilio.default)(accountSid, authToken);
const whatssapRoutes = (0, _express.Router)();
whatssapRoutes.post('/', (request, response) => {
  clientSendMessage.messages.create({
    from: 'whatsapp:+14155238886',
    body: 'Hello World!',
    to: 'whatsapp:+5527988209811'
  }).then(message => console.log(message));
});
var _default = whatssapRoutes;
exports.default = _default;