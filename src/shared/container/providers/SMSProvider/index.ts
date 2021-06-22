import { container } from 'tsyringe';
import ISMSProvider from './models/ISMSProvider';
import TwilloSMSProvider from './implementations/TwilloSMSProvider';

container.registerSingleton<ISMSProvider>('SMSProvider', TwilloSMSProvider);
