// import mailConfig from '@config/mail';
// import { container } from 'tsyringe';
// import EtherealMailProvider from './EtherealMailProvider';
// import SESMailProvider from './SESMailProvider';
// import IMailProvider from './models/IMailProvider';
// import MailgunMailProvider from './MailgunMailProvider';

// const providers = {
//   ethereal: container.resolve(EtherealMailProvider),
//   ses: container.resolve(SESMailProvider),
//   mailgun: container.resolve(MailgunMailProvider),
// };
// container.registerInstance<IMailProvider>(
//   'MailProvider',
//   providers[mailConfig.driver],
// );
