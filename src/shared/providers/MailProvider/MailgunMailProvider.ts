import mailConfig from '@config/mail';
import {
  createTestAccount,
  getTestMessageUrl,
  Transporter,
  createTransport,
} from 'nodemailer';
import { NodeMailgun } from 'ts-mailgun';
import IMailTemplateProvider from '../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from './dtos/ISendMailDTO';
import IMailProvider from './models/IMailProvider';

export default class MailgunMailProvider implements IMailProvider {
  private client: NodeMailgun;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    const { domain } = mailConfig.config.mailgun;
    const apiKey = process.env.MAILGUN_API_KEY || '*';

    this.client = new NodeMailgun(apiKey, domain);
  }

  async sendMail({ to, subject, template_data }: ISendMailDTO): Promise<void> {
    const { name, address } = mailConfig.config.mailgun.defaults.from;

    Object.assign(this.client, {
      fromEmail: address,
      fromTitle: name,
    });

    this.client.init();

    await this.client.send(
      to.address,
      subject,
      await this.mailTemplateProvider.parse(template_data),
    );
  }
}
