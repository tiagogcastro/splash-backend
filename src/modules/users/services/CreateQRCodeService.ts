import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import AppError from '@shared/errors/AppError';
import IQRCodeProvider from '@shared/container/providers/QRCodeProvider/models/IQRCodeProvider';
import ICreateQRCodeServiceDTO from '../dtos/ICreateQRCodeServiceDTO';

export default class CreateQRCodeService {
  constructor(
    private qrcodeRepository: IQRCodeProvider,
    private sponsorshipsRepository: ISponsorshipsRepository,
  ) {}

  public async execute({
    sponsorship_code,
  }: ICreateQRCodeServiceDTO): Promise<NodeJS.ReadableStream> {
    const payload = process.env.APP_WEB_URL || '*';

    if (!sponsorship_code)
      throw new AppError('This sponsorship code does not exist');

    const isSponsorshipCode =
      await this.sponsorshipsRepository.findBySponsorshipCode(sponsorship_code);

    if (!isSponsorshipCode)
      throw new AppError('This is an invalid or non-existent sponsorship code');

    const code = await this.qrcodeRepository.generate(
      `${payload}?cod=${sponsorship_code}`,
    );

    return code;
  }
}
