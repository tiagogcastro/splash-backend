"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _notifications = _interopRequireDefault(require("../../../../modules/notifications/infra/http/routes/notifications.routes"));

var _sponsorships = _interopRequireDefault(require("../../../../modules/sponsorships/infra/http/routes/sponsorships.routes"));

var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _sponsors = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sponsors.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _whatssap = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/whatssap.routes"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/users', _users.default);
router.use('/sessions', _sessions.default);
router.use('/profile', _profile.default);
router.use('/whats', _whatssap.default);
router.use('/sponsors', _sponsors.default);
router.use('/sponsorships', _sponsorships.default);
router.use('/notifications', _notifications.default);
var _default = router;
exports.default = _default;