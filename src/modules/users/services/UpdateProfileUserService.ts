import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { compare, hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
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
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const checkEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (checkEmailAlreadyExists && checkEmailAlreadyExists.email !== email) {
      throw new AppError('This email address already exists', 401);
    }

    if (checkEmailAlreadyExists?.email !== email) {
      if (email && !token) {
        const { token: generatedToken } =
          await this.userTokensRepository.generate(user.id);

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

        const userTokens = await this.userTokensRepository.findValidToken({
          token,
          user_id: user.id,
        });

        if (!userTokens)
          throw new AppError('Token does not exist or has already been used');

        const limitDate = addHours(userTokens.created_at, 12);

        if (isAfter(Date.now(), limitDate)) {
          userTokens.active = false;

          await this.userTokensRepository.save(userTokens);

          throw new AppError('Token expired', 401);
        }
        userTokens.active = false;

        await this.userTokensRepository.save(userTokens);
      }
    }

    const usernameExist = await this.usersRepository.findByUsername(username);

    if (usernameExist && usernameExist.username !== username) {
      throw new AppError('This username already exists', 401);
    }

    if (password && !old_password) {
      throw new AppError('You need to inform your old password', 401);
    }

    if (old_password) {
      const passwordMatched = compare(old_password, user.password);

      if (!passwordMatched) {
        throw new AppError('Old password not matched', 401);
      }
    }
    if (password) {
      const hashedPassword = await hash(password, 8);

      user.password = hashedPassword;
    }

    user.name = name;

    if (bio) {
      user.bio = bio;
    }

    if (user.email !== email) {
      user.email = email;
    }

    if (user.username !== username) {
      user.username = username;
    }

    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateProfileUserService;
