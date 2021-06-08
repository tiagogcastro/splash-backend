"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddEmailAndPasswordUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  } // eslint-disable-next-line consistent-return


  async execute({
    user_id,
    email,
    password,
    password_confirmation
  }) {
    const userLogged = await this.usersRepository.findById(user_id);

    if (!userLogged) {
      throw new _AppError.default('User not exist', 401);
    }

    const emailExist = await this.usersRepository.findByEmail(email);

    if (emailExist && emailExist.id !== user_id) {
      throw new _AppError.default('Este email já existe', 401);
    }

    if (userLogged.email && userLogged.password) {
      throw new _AppError.default('Você já tem um e-mail e senha registrado em sua conta', 401);
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
      password: hashedPassword
    });

    if (user.affected === 1) {
      const userUpdated = await this.usersRepository.findById(user_id);
      return userUpdated;
    }
  }

}

var _default = AddEmailAndPasswordUserService;
exports.default = _default;