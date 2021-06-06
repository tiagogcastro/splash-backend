import ICreateSponsorshipDTO from '@modules/sponsorships/dtos/ICreateSponsorshipDTO';
import IFindSponsorshipDTO from '@modules/sponsorships/dtos/IFindSponsorshipDTO';
import IFindSponsorshipUnavailableDTO from '@modules/sponsorships/dtos/IFindSponsorshipUnavailableDTO';
import IUpdateSponsorshipDTO from '@modules/sponsorships/dtos/IUpdateSponsorshipDTO';
import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import { getRepository, Repository } from 'typeorm';
import Sponsorship from '../entities/Sponsorship';

export default class PostgresSponsorshipsRepository
  implements ISponsorshipsRepository
{
  private ormRepository: Repository<Sponsorship>;

  constructor() {
    this.ormRepository = getRepository(Sponsorship);
  }

  async updateSponsorship(
    sponsor_user_id: string,
    sponsorshipsUpdateData: IUpdateSponsorshipDTO,
  ): Promise<Sponsorship | undefined> {
    const { affected } = await this.ormRepository.update(
      sponsor_user_id,
      sponsorshipsUpdateData,
    );

    if (affected === 1) {
      const updated = await this.ormRepository.findOne(sponsor_user_id);

      return updated;
    }
    return undefined;
  }

  async findBySponsorshipCode(
    sponsorship_code: string,
  ): Promise<Sponsorship | undefined> {
    const sponsorship = await this.ormRepository.findOne({
      where: {
        sponsorship_code,
      },
    });

    return sponsorship;
  }

  async findAllSponsorshipsFromUser(
    sponsored_user_id: string,
  ): Promise<Sponsorship[]> {
    const sponsorships = await this.ormRepository.find({
      where: {
        sponsored_user_id,
      },
      relations: ['sponsor'],
    });
    return sponsorships;
  }

  async findSponsorshipUnavailable({
    sponsor_user_id,
    sponsored_user_id,
  }: IFindSponsorshipUnavailableDTO): Promise<Sponsorship | undefined> {
    const sponsorship = await this.ormRepository.findOne({
      where: {
        sponsor_user_id,
        sponsored_user_id,
        allow_withdrawal: false,
        status: null,
      },
    });
    return sponsorship;
  }

  async save(sponsorship: Sponsorship): Promise<Sponsorship> {
    return this.ormRepository.save(sponsorship);
  }

  async findSponsorship({
    sponsor_user_id,
    sponsored_user_id,
  }: IFindSponsorshipDTO): Promise<Sponsorship | undefined> {
    const sponsorship = await this.ormRepository.findOne({
      where: {
        sponsor_user_id,
        sponsored_user_id,
      },
    });
    return sponsorship;
  }

  async findAllSponsoredFromUser(
    sponsor_user_id: string,
  ): Promise<Sponsorship[]> {
    const sponsorships = await this.ormRepository.find({
      where: {
        sponsor_user_id,
      },
      relations: ['sponsored'],
    });
    return sponsorships;
  }

  async create(sponsorshipData: ICreateSponsorshipDTO): Promise<Sponsorship> {
    const sponsorship = this.ormRepository.create(sponsorshipData);

    await this.ormRepository.save(sponsorship);

    return sponsorship;
  }
}
