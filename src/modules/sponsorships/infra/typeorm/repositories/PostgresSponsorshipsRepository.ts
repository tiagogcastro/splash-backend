import ICreateSponsorshipDTO from '@modules/sponsorships/dtos/ICreateSponsorshipDTO';
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

  async create(sponsorshipData: ICreateSponsorshipDTO): Promise<Sponsorship> {
    const sponsorship = this.ormRepository.create(sponsorshipData);

    await this.ormRepository.save(sponsorship);

    return sponsorship;
  }
}
