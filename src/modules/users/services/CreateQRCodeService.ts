import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import IQRCodeProvider from '@shared/providers/QRCodeProvider/models/IQRCodeProvider';

export default class CreateQRCodeService {
  constructor(
    private qrcodeRepository: IQRCodeProvider,
    private sponsorshipsRepository: ISponsorshipsRepository,
  ) {}

  public async execute(): Promise<NodeJS.ReadableStream> {
    const payload = process.env.APP_WEB_URL || '*';

    const code = await this.qrcodeRepository.generate(payload);

    return code;
  }
}
