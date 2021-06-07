import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  email: string;
  password: string;
  password_confirmation: string;
}

class AddEmailAndPasswordUserService {
  constructor(private usersRepository: IUsersRepository) {}

  // eslint-disable-next-line consistent-return
  async execute({
    user_id,
    email,
    password,
    password_confirmation,
  }: Request): Promise<User | undefined> {
    const userLogged = await this.usersRepository.findById(user_id);

    if (!userLogged) {
      throw new AppError('User not exist', 401);
    }

    const emailExist = await this.usersRepository.findByEmail(email);

    if (emailExist && emailExist.id !== user_id) {
      throw new AppError('Este email já existe', 401);
    }

    if(userLogged.email && userLogged.password) {
      throw new AppError('Você já tem um e-mail e senha registrado em sua conta', 401);
    }
    if (
      (password && !password_confirmation) ||
      (!password && password_confirmation)
    ) {
      throw new AppError('A senha e confirmação de senha é obrigatório', 401);
    }

    if (password !== password_confirmation) {
      throw new AppError('A senha é diferente da confirmação de senha', 401);
    }

    if (password && password.length < 6) {
      throw new AppError('A senha precisa ter no mínimo 6 digitos', 401);
    }

    const hashedPassword = await hash(String(password), 8);

    const user = await this.usersRepository.update(userLogged.id, {
      email,
      password: hashedPassword,
    });

    if (user.affected === 1) {
      const userUpdated = await this.usersRepository.findById(user_id);

      return userUpdated;
    }
  }
}

export default AddEmailAndPasswordUserService;
