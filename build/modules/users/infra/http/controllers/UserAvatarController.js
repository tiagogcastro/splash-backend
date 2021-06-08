"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

var _DiskStorageProvider = _interopRequireDefault(require("../../../../../shared/providers/StorageProvider/DiskStorageProvider"));

var _S3StorageProvider = _interopRequireDefault(require("../../../../../shared/providers/StorageProvider/S3StorageProvider"));

var _classTransformer = require("class-transformer");

var _PostgresUsersRepository = _interopRequireDefault(require("../../typeorm/repositories/PostgresUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAvatarController {
  async update(request, response) {
    const providers = {
      disk: new _DiskStorageProvider.default(),
      s3: new _S3StorageProvider.default()
    };
    const postgresUsersRepository = new _PostgresUsersRepository.default();
    const updateUserAvatar = new _UpdateUserAvatarService.default(postgresUsersRepository, providers[_upload.default.driver]);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });
    return response.status(200).json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserAvatarController;