"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SponsorUserController = _interopRequireDefault(require("../controllers/SponsorUserController"));

var _SponsoringUserController = _interopRequireDefault(require("../controllers/SponsoringUserController"));

var _SponsoredUserController = _interopRequireDefault(require("../controllers/SponsoredUserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sponsorsRoutes = (0, _express.Router)();
const sponsorUserController = new _SponsorUserController.default();
const sponsoringUserController = new _SponsoringUserController.default();
const sponsoredUserController = new _SponsoredUserController.default();
sponsorsRoutes.put('/', sponsorUserController.update);
sponsorsRoutes.delete('/', sponsorUserController.delete);
sponsorsRoutes.get('/sponsoring/:user_id', sponsoringUserController.index);
sponsorsRoutes.get('/sponsored/:user_id', sponsoredUserController.index);
var _default = sponsorsRoutes;
exports.default = _default;