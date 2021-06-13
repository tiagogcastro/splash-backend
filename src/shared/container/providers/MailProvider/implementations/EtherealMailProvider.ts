import mailConfig from '@config/mail';
import {
  createTestAccount,
  getTestMessageUrl,
  Transporter,
  createTransport,
} from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    createTestAccount().then(account => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  async sendMail({
    to,
    from,
    subject,
    template_data,
  }: ISendMailDTO): Promise<void> {
    const { name, address } = mailConfig.config.ethereal.defaults.from;
    const message = await this.client.sendMail({
      to: {
        name: to.name,
        address: to.address,
      },
      from: {
        name: from?.name || name,
        address: from?.address || address,
      },
      subject,
      html: await this.mailTemplateProvider.parse(template_data),
    });
    console.log(message.messageId);
    console.log(getTestMessageUrl(message));
  }
}
