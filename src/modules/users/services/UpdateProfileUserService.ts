import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  email?: string;
  name?: string;
  password?: string;
  password_confirmation?: string;
  username: string;
}

class UpdateProfileUserService {
  async execute({user_id, email, name, password, password_confirmation, username}: Request): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const userLogged = await usersRepository.findOne({
      where: {id: user_id}
    });

    if(!userLogged) {
      throw new AppError('User not exist', 401);
    }

    const emailExist = await usersRepository.findOne({
      where: {email}
    });

    if(emailExist && emailExist.id !== user_id) {
      throw new AppError('Este email já existe', 401);
    }

    const usernameExist = await usersRepository.findOne({
      where: {username}
    });

    if(usernameExist && usernameExist.id !== user_id) {
      throw new AppError('Este username já existe', 401);
    }

    if(!username) {
      throw new AppError('Username obrigatório', 401);
    }

    if(password && !password_confirmation || !password && password_confirmation ) {
      throw new AppError('A senha e confirmação de senha é obrigatório', 401);
    }

    if(password !== password_confirmation) {
      throw new AppError('A senha é diferente da confirmação de senha', 401);
    }

    if(password && password.length < 6) {
      throw new AppError('A senha precisa ter no mínimo 6 digitos', 401);
    }

    const hashedPassword = await hash(String(password), 8);

    const user = await usersRepository.update(userLogged.id, {
      email,
      name,
      password: hashedPassword,
      username
    });

    if(user.affected === 1) {
      const userUpdated = await usersRepository.findOne({
        where: {id: user_id}
      });

      return userUpdated;
    }
  }
}

export default UpdateProfileUserService;