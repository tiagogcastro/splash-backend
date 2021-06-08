"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _qrImage = _interopRequireDefault(require("qr-image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QRImageProvider {
  async generate(payload) {
    const code = _qrImage.default.image(payload, {
      type: 'svg'
    });

    return code;
  }

}

exports.default = QRImageProvider;