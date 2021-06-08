import IUpdateSponsoringSponsoredCountDTO from '@modules/users/dtos/IUpdateSponsoringSponsoredCountDTO';
import ISponsoringSponsoredCountRepository from '@modules/users/repositories/ISponsoringSponsoredCountRepository';
import { getRepository, Repository } from 'typeorm';
import SponsoringSponsoredCount from '../entities/SponsoringSponsoredCount';

export default class PostgresSponsoringSponsoredCountRepository
  implements ISponsoringSponsoredCountRepository
{
  private ormRepository: Repository<SponsoringSponsoredCount>;

  constructor() {
    this.ormRepository = getRepository(SponsoringSponsoredCount);
  }

  async updateCount(
    user_id: string,
    data: IUpdateSponsoringSponsoredCountDTO,
  ): Promise<SponsoringSponsoredCount | undefined> {
    const count = await this.ormRepository.update(user_id, data);

    if (count.affected === 1) {
      const countUpdated = await this.ormRepository.findOne(user_id);

      return countUpdated;
    }
    return undefined;
  }
}
