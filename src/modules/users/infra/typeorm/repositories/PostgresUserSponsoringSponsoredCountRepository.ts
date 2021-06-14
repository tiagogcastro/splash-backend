import IUpdateSponsoringSponsoredCountDTO from '@modules/users/dtos/IUpdateSponsoringSponsoredCountDTO';
import IUserSponsorSponsoredCountRepository from '@modules/users/repositories/IUserSponsoringSponsoredCountRepository';
import { getRepository, Repository } from 'typeorm';
import UserSponsorSponsoredCount from '../entities/UserSponsorSponsoredCount';

export default class PostgresUserSponsorSponsoredCountRepository
  implements IUserSponsorSponsoredCountRepository
{
  private ormRepository: Repository<UserSponsorSponsoredCount>;

  constructor() {
    this.ormRepository = getRepository(UserSponsorSponsoredCount);
  }

  async updateCount(
    user_id: string,
    data: IUpdateSponsoringSponsoredCountDTO,
  ): Promise<UserSponsorSponsoredCount | undefined> {
    const count = await this.ormRepository.update(user_id, data);

    if (count.affected === 1) {
      const countUpdated = await this.ormRepository.findOne(user_id);

      return countUpdated;
    }
    return undefined;
  }
}
