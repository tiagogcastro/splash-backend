import { addHours, addSeconds, isAfter } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import { compare, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import path from 'path';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface Request {
  user_id: string;
  email?: string;
  name?: string;
  bio?: string;
  old_password?: string;
  token?: string;
  password?: string;
  password_confirmation?: string;
  username: string;
}

class UpdateProfileUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute({
    user_id,
    email,
    name,
    bio,
    old_password,
    password,
    token,
    username,
  }: Request): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const userLogged = await this.usersRepository.findById(user_id);

    if (!userLogged) {
      throw new AppError('User does not exist', 401);
    }

    const checkEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (checkEmailAlreadyExists) {
      throw new AppError('This email address already exists', 401);
    }
    if (email && !token) {
      const { token: generatedToken } =
        await this.userTokensRepository.generate(user_id);

      const emailVerificationViewPath = path.resolve(
        __dirname,
        '..',
        'views',
        'emailVerificationView.hbs',
      );
      await this.mailProvider.sendMail({
        to: {
          name: name || username,
          address: email,
        },
        subject: 'Verificação de e-mail',
        template_data: {
          file: emailVerificationViewPath,
          variables: {
            name: name || username,
            hour: 12,
            link: `${process.env.APP_WEB_URL}/perfil/editar?token=${generatedToken}`,
          },
        },
      });
      throw new AppError(
        'Please check your email, your code will be expire after 12 hours',
        401,
      );
    }
    if (token) {
      if (!email) throw new AppError('You need to inform an email');

      const userTokens = await this.userTokensRepository.findByToken({
        token,
        user_id,
      });

      if (!userTokens) throw new AppError('Token does not exist');

      const limitDate = addHours(userTokens.created_at, 12);

      if (isAfter(Date.now(), limitDate)) {
        throw new AppError('Token expired', 401);
      }
    }

    const usernameExist = await usersRepository.findOne({
      where: { username },
    });

    if (usernameExist && usernameExist.id !== user_id) {
      throw new AppError('This username already exists', 401);
    }

    if (!username) {
      throw new AppError('An username is required', 401);
    }

    if (password && !old_password) {
      throw new AppError('You need to inform your old password', 401);
    }
    let userUpdated;

    if (password && old_password) {
      const checkOldPassword = compare(old_password, userLogged.password);

      if (!checkOldPassword) {
        throw new AppError('Old password not matched', 401);
      }

      if (password && password.length < 6) {
        throw new AppError('A senha precisa ter no mínimo 6 digitos', 401);
      }

      const hashedPassword = await hash(String(password), 8);

      const user = await this.usersRepository.update(userLogged.id, {
        email,
        name,
        password: hashedPassword,
        username,
        bio,
      });
      if (user.affected === 1) {
        userUpdated = await this.usersRepository.findById(user_id);
      }
    }
    return userUpdated;
  }
}

export default UpdateProfileUserService;
