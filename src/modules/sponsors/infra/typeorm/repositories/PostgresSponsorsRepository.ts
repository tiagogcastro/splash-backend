import ICreateSponsorDTO from '@modules/sponsors/dtos/ICreateSponsorDTO';
import ISponsorsRepository from '@modules/sponsors/repositories/ISponsorsRepository';
import { getRepository, Repository } from 'typeorm';
import Sponsor from '../schemas/Sponsor';

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
