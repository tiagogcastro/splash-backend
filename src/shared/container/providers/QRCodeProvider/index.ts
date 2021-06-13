import { container } from 'tsyringe';
import IQRCodeProvider from './models/IQRCodeProvider';
import QRImageProvider from './QRImageProvider';

container.registerSingleton<IQRCodeProvider>('QRCodeProvider', QRImageProvider);
