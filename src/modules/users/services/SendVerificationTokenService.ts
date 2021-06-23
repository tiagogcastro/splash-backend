import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import ISendVerificationTokenServiceDTO from '../dtos/ISendVerificationTokenServiceDTO';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
export default class SendVerificationTokenService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    user_id,
    email,
  }: ISendVerificationTokenServiceDTO): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 401);

    const checkEmailAlreadyExists = await this.userRepository.findByEmail(
      email,
    );

    if (checkEmailAlreadyExists) {
      throw new AppError('This email address already exists');
    }

    const { token } = await this.userTokensRepository.generate({
      email,
      user_id,
    });

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
          link: `${process.env.APP_WEB_URL}/perfil/register/verify?token=${token}`,
        },
      },
    });
  }
}
