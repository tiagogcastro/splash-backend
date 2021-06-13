import mailConfig from '@config/mail';
import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import MailgunMailProvider from './implementations/MailgunMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  mailgun: container.resolve(MailgunMailProvider),
};
container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
