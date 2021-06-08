"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateUserAvatarService {
  constructor(usersRepository, storageProvider) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    user_id,
    avatarFileName
  }) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new _AppError.default('Only autheticated users can change avatar', 401);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = avatarFileName;
    await this.storageProvider.saveFile(avatarFileName);
    await this.usersRepository.save(user);
    return user;
  }

}

var _default = UpdateUserAvatarService;
exports.default = _default;