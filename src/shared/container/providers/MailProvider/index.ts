// import mailConfig from '@config/mail';
// import { container } from 'tsyringe';
// import EtherealMailProvider from './EtherealMailProvider';
// import SESMailProvider from './SESMailProvider';
// import IMailProvider from './models/IMailProvider';
// import MailgunMailProvider from './MailgunMailProvider';

// const providers = {
//   ses: container.resolve(SESMailProvider),
//   ethereal: container.resolve(EtherealMailProvider),
//   mailgun: container.resolve(MailgunMailProvider),
// };
// container.registerInstance<IMailProvider>(
//   'MailProvider',
//   providers[mailConfig.driver],
// );
