"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middleware/ensureAuthenticated"));

var _express = require("express");

var _NotificationsController = _interopRequireDefault(require("../controllers/NotificationsController"));

var _SponsorshipHistoryController = _interopRequireDefault(require("../controllers/SponsorshipHistoryController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const notificationsRouter = (0, _express.Router)();
const notificationsController = new _NotificationsController.default();
const sponsorshipHistoryController = new _SponsorshipHistoryController.default();
notificationsRouter.use(_ensureAuthenticated.default);
notificationsRouter.get('/sponsorships-history/:sender_id', sponsorshipHistoryController.index);
notificationsRouter.get('/sponsorships', notificationsController.index);
notificationsRouter.post('/send-notifications-for-ios', notificationsController.sendNotificationForIos);
var _default = notificationsRouter;
exports.default = _default;