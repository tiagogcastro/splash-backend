import ICreateSponsorshipDTO from '@modules/sponsorships/dtos/ICreateSponsorshipDTO';
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
  
  async updateSponsorship(sponsor_user_id: string, sponsorshipsUpdateData: IUpdateSponsorshipDTO): Promise<Sponsorship | undefined> {
    const { affected } = await this.ormRepository.update(sponsor_user_id, sponsorshipsUpdateData);

    if(affected === 1 ) {
      const updated = await this.ormRepository.findOne(sponsor_user_id);

      return updated;
    };
  }

  async findBySponsorshipCode(sponsorship_code: string): Promise<Sponsorship | undefined> {
    const sponsorship = await this.ormRepository.findOne({
      where: {
        sponsorship_code
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
