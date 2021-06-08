"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateProfileUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  } // eslint-disable-next-line consistent-return


  async execute({
    user_id,
    email,
    name,
    bio,
    old_password,
    password,
    password_confirmation,
    username
  }) {
    const usersRepository = (0, _typeorm.getRepository)(_User.default);
    const userLogged = await this.usersRepository.findById(user_id);

    if (!userLogged) {
      throw new _AppError.default('User not exist', 401);
    }

    const emailExist = await this.usersRepository.findByEmail(email);

    if (emailExist && emailExist.id !== user_id) {
      throw new _AppError.default('Este email já existe', 401);
    }

    const usernameExist = await usersRepository.findOne({
      where: {
        username
      }
    });

    if (usernameExist && usernameExist.id !== user_id) {
      throw new _AppError.default('Este username já existe', 401);
    }

    if (!username) {
      throw new _AppError.default('Username obrigatório', 401);
    }

    if (password && !old_password) {
      throw new _AppError.default('Você precisa informar sua senha antiga', 401);
    }

    if (password && old_password) {
      const checkOldPassword = (0, _bcryptjs.compare)(old_password, userLogged.password);

      if (!checkOldPassword) {
        throw new _AppError.default('Old password not matched', 401);
      }
    }

    if (password && !password_confirmation || !password && password_confirmation) {
      throw new _AppError.default('A senha e confirmação de senha é obrigatório', 401);
    }

    if (password !== password_confirmation) {
      throw new _AppError.default('A senha é diferente da confirmação de senha', 401);
    }

    if (password && password.length < 6) {
      throw new _AppError.default('A senha precisa ter no mínimo 6 digitos', 401);
    }

    const hashedPassword = await (0, _bcryptjs.hash)(String(password), 8);
    const user = await this.usersRepository.update(userLogged.id, {
      email,
      name,
      password: hashedPassword,
      username,
      bio
    });

    if (user.affected === 1) {
      const userUpdated = await this.usersRepository.findById(user_id);
      return userUpdated;
    }
  }

}

var _default = UpdateProfileUserService;
exports.default = _default;