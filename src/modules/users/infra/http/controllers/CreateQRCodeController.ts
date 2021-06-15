import memory from '@modules/sponsorships/in-memory';
import CreateQRCodeService from '@modules/users/services/CreateQRCodeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateQRCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sponsorship_code = memory.sponsorship.code;

    const createQRCode = container.resolve(CreateQRCodeService);

    const code = await createQRCode.execute({
      sponsorship_code,
    });

    code.pipe(response);

    return response.type('png');
  }
}

export default CreateQRCodeController;
