import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { compare, hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface Request {
  user_id: string;
  email?: string;
  name?: string;
  bio?: string;
  old_password?: string;
  token?: string;
  password?: string;
  username?: string;
}
@injectable()
class UpdateProfileUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
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
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const checkEmailAlreadyExists = await this.userRepository.findByEmail(
      email,
    );

    if (checkEmailAlreadyExists && checkEmailAlreadyExists.email !== email) {
      throw new AppError('This email address already exists', 401);
    }

    if (checkEmailAlreadyExists?.email !== email) {
      if (email && !token) {
        const { token: generatedToken } =
          await this.userTokensRepository.generate(email);

        const emailVerificationViewPath = path.resolve(
          __dirname,
          '..',
          'views',
          'emailVerificationView.hbs',
        );
        await this.mailProvider.sendMail({
          to: {
            name: user.name || user.username,
            address: email,
          },
          subject: 'Verificação de e-mail',
          template_data: {
            file: emailVerificationViewPath,
            variables: {
              name: name || user.username,
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
          email,
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

    const usernameExist = await this.userRepository.findByUsername(username);

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

    if (name) {
      user.name = name;
    }

    if (bio) {
      user.bio = bio;
    }

    if (email && user.email !== email) {
      user.email = email;
    }

    if (username && user.username !== username) {
      user.username = username;
    }

    await this.userRepository.save(user);
    return user;
  }
}

export default UpdateProfileUserService;
