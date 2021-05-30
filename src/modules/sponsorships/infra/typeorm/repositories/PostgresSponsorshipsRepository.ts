import ICreateSponsorDTO from '@modules/sponsorships/dtos/ICreateSponsorDTO';
import ISponsorsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import { getRepository, Repository } from 'typeorm';
import Sponsor from '../entities/Sponsorship';

export default class PostgresSponsorsRepository implements ISponsorsRepository {
  private ormRepository: Repository<Sponsor>;

  constructor() {
    this.ormRepository = getRepository(Sponsor);
  }

  async create(sponsorData: ICreateSponsorDTO): Promise<Sponsor> {
    const sponsor = this.ormRepository.create(sponsorData);

    await this.ormRepository.save(sponsor);

    return sponsor;
  }
}
