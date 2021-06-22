import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import AppSuccess from '@shared/success/AppSuccess';
import { addHours, isAfter } from 'date-fns';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface Resquest {
  user_id: string;
  email?: string;
  token?: string;
}

@injectable()
export default class UpdateUserEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ user_id, email, token }: Resquest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 401);
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
              name: user.name || user.username,
              hour: 12,
              link: `${process.env.APP_WEB_URL}/perfil/editar?token=${generatedToken}`,
            },
          },
        });
        throw new AppSuccess(
          'Please check your email, your code will be expire after 12 hours',
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

    if (email && user.email !== email) {
      user.email = email;

      this.userRepository.save(user);
    }

    return user;
  }
}
