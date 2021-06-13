import memory from '@modules/sponsorships/in-memory';
import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import CreateQRCodeService from '@modules/users/services/CreateQRCodeService';
import QRImageProvider from '@shared/container/providers/QRCodeProvider/QRImageProvider';
import { Request, Response } from 'express';

class QRCodeController {
  async create(request: Request, response: Response): Promise<Response> {
    const sponsorship_code = memory.sponsorship.code;

    const qrimageProvider = new QRImageProvider();
    const postgresSponsorshipsRepository = new PostgresSponsorshipsRepository();

    const createQRCode = new CreateQRCodeService(
      qrimageProvider,
      postgresSponsorshipsRepository,
    );
    const code = await createQRCode.execute({
      sponsorship_code,
    });

    code.pipe(response);

    return response.type('png');
  }
}

export default QRCodeController;
