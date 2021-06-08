"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateQRCodeService {
  constructor(qrcodeRepository, sponsorshipsRepository) {
    this.qrcodeRepository = qrcodeRepository;
    this.sponsorshipsRepository = sponsorshipsRepository;
  }

  async execute({
    sponsorship_code
  }) {
    const payload = process.env.APP_WEB_URL || '*';
    if (!sponsorship_code) throw new _AppError.default('This sponsorship code does not exist');
    const isSponsorshipCode = await this.sponsorshipsRepository.findBySponsorshipCode(sponsorship_code);
    if (!isSponsorshipCode) throw new _AppError.default('This is an invalid or non-existent sponsorship code');
    const code = await this.qrcodeRepository.generate(`${payload}?cod=${sponsorship_code}`);
    return code;
  }

}

exports.default = CreateQRCodeService;