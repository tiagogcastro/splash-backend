import { container } from 'tsyringe';
import HandlebarsMailTemplateProvider from './HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
