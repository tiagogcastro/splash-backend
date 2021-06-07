import QRImageProvider from '@shared/providers/QRCodeProvider/QRImageProvider';
import { Request, Response } from 'express';

class QRCodeController {
  async create(request: Request, response: Response): Promise<Response> {
    const qrimageProvider = new QRImageProvider();

    const code = await qrimageProvider.generate('');

    code.pipe(response);

    return response.type('svg');
  }
}

export default QRCodeController;
