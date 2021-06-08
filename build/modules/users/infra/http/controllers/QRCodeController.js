"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inMemory = _interopRequireDefault(require("../../../../sponsorships/in-memory"));

var _PostgresSponsorshipsRepository = _interopRequireDefault(require("../../../../sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository"));

var _CreateQRCodeService = _interopRequireDefault(require("../../../services/CreateQRCodeService"));

var _QRImageProvider = _interopRequireDefault(require("../../../../../shared/providers/QRCodeProvider/QRImageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QRCodeController {
  async create(request, response) {
    const sponsorship_code = _inMemory.default.sponsorship.code;
    const qrimageProvider = new _QRImageProvider.default();
    const postgresSponsorshipsRepository = new _PostgresSponsorshipsRepository.default();
    const createQRCode = new _CreateQRCodeService.default(qrimageProvider, postgresSponsorshipsRepository);
    const code = await createQRCode.execute({
      sponsorship_code
    });
    code.pipe(response);
    return response.type('svg');
  }

}

var _default = QRCodeController;
exports.default = _default;