"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middleware/ensureAuthenticated"));

var _express = require("express");

var _celebrate = require("celebrate");

var _ensurePayment = _interopRequireDefault(require("../middlewares/ensurePayment"));

var _SponsoredController = _interopRequireDefault(require("../controllers/SponsoredController"));

var _SponsorshipsController = _interopRequireDefault(require("../controllers/SponsorshipsController"));

var _SponsoredMeController = _interopRequireDefault(require("../controllers/SponsoredMeController"));

var _SponsorshipCodeController = _interopRequireDefault(require("../controllers/SponsorshipCodeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sponsorshipsRouter = (0, _express.Router)();
const sponsorshipsController = new _SponsorshipsController.default();
const sponsoredController = new _SponsoredController.default();
const sponsoredMeController = new _SponsoredMeController.default();
const sponsorshipCodeController = new _SponsorshipCodeController.default();
sponsorshipsRouter.use(_ensureAuthenticated.default);
sponsorshipsRouter.get('/sponsored/me', sponsoredMeController.index);
sponsorshipsRouter.get('/sponsored', sponsoredController.index);
sponsorshipsRouter.post('/', _ensurePayment.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    user_recipient_id: _celebrate.Joi.string().uuid(),
    allow_withdrawal_balance: _celebrate.Joi.boolean(),
    amount: _celebrate.Joi.number().required()
  }
}), sponsorshipsController.create);
sponsorshipsRouter.post('/sponsorship-code', _ensurePayment.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    allow_withdrawal_balance: _celebrate.Joi.boolean(),
    amount: _celebrate.Joi.number().required()
  }
}), sponsorshipCodeController.create);
var _default = sponsorshipsRouter;
exports.default = _default;