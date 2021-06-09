import QRImage from 'qr-image';
import IQRCodeProvider from './models/IQRCodeProvider';

export default class QRImageProvider implements IQRCodeProvider {
  async generate(payload: string): Promise<NodeJS.ReadableStream> {
    const code = QRImage.image(payload, {
      type: 'png',
    });
    return code;
  }
}
