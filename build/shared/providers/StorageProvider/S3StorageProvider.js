"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: _upload.default.config.aws.region
    });
  }

  async saveFile(file) {
    const originalPath = _path.default.resolve(_upload.default.tmpFolder, file);

    const fileContent = await _fs.default.promises.readFile(originalPath);

    const ContentType = _mime.default.getType(originalPath);

    if (!ContentType) throw new _AppError.default('file not found.');
    await this.client.putObject({
      Bucket: _upload.default.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();

    try {
      await _fs.default.promises.stat(originalPath);
    } catch {
      return file;
    }

    await _fs.default.promises.unlink(originalPath);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: _upload.default.config.aws.bucket,
      Key: file
    }).promise();
  }

}

exports.default = S3StorageProvider;