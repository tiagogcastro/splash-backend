import { container } from 'tsyringe';
import IQRCodeProvider from './models/IQRCodeProvider';
import QRImageProvider from './implementations/QRImageProvider';

container.registerSingleton<IQRCodeProvider>('QRCodeProvider', QRImageProvider);
