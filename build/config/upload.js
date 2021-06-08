"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tmpFolder = _path.default.resolve(__dirname, '..', '..', 'tmp');

var _default = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder: _path.default.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: _multer.default.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const hashed = _crypto.default.randomBytes(10).toString('hex');

        const originalName = file.originalname.replace(' ', '-');
        const fileName = `${hashed}-${originalName}`;
        callback(null, fileName);
      }
    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-lavimco',
      region: 'sa-east-1'
    }
  }
};
exports.default = _default;