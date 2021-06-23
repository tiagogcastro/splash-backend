import ISponsorshipRepository from '@modules/sponsorships/repositories/ISponsorshipRepository';
import AppError from '@shared/errors/AppError';
import IQRCodeProvider from '@shared/container/providers/QRCodeProvider/models/IQRCodeProvider';
import { inject, injectable } from 'tsyringe';
import ICreateQRCodeServiceDTO from '../dtos/ICreateQRCodeServiceDTO';

@injectable()
export default class CreateQRCodeService {
  constructor(
    @inject('QRCodeProvider')
    private qrcodeProvider: IQRCodeProvider,

    @inject('SponsorshipRepository')
    private sponsorshipRepository: ISponsorshipRepository,
  ) {}

  public async execute({
    sponsorship_code,
  }: ICreateQRCodeServiceDTO): Promise<NodeJS.ReadableStream> {
    if (!sponsorship_code)
      throw new AppError('This sponsorship code does not exist');

    const sponsorship = await this.sponsorshipRepository.findBySponsorshipCode(
      sponsorship_code,
    );

    if (!sponsorship)
      throw new AppError('This is an invalid or non-existent sponsorship code');

    const code = await this.qrcodeProvider.generate(
      `${process.env.APP_WEB_URL}/signup?sponsorship_code=${sponsorship_code}`,
    );

    return code;
  }
}
