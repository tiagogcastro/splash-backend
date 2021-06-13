import IUpdateSponsoringSponsoredCountDTO from '@modules/users/dtos/IUpdateSponsoringSponsoredCountDTO';
import IUserSponsoringSponsoredCountRepository from '@modules/users/repositories/IUserSponsoringSponsoredCountRepository';
import { getRepository, Repository } from 'typeorm';
import UserSponsoringSponsoredCount from '../entities/UserSponsoringSponsoredCount';

export default class PostgresUserSponsoringSponsoredCountRepository
  implements IUserSponsoringSponsoredCountRepository
{
  private ormRepository: Repository<UserSponsoringSponsoredCount>;

  constructor() {
    this.ormRepository = getRepository(UserSponsoringSponsoredCount);
  }

  async updateCount(
    user_id: string,
    data: IUpdateSponsoringSponsoredCountDTO,
  ): Promise<UserSponsoringSponsoredCount | undefined> {
    const count = await this.ormRepository.update(user_id, data);

    if (count.affected === 1) {
      const countUpdated = await this.ormRepository.findOne(user_id);

      return countUpdated;
    }
    return undefined;
  }
}
