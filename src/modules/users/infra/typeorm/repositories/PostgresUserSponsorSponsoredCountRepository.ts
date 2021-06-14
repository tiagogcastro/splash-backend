import ICreateUserSponsorSponsoredCountDTO from '@modules/users/dtos/ICreateUserSponsorSponsoredCountDTO';
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

  async findByUserId(
    user_id: string,
  ): Promise<UserSponsorSponsoredCount | undefined> {
    const userSponsorSponsoredCount = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });
    return userSponsorSponsoredCount;
  }

  async save(
    userSponsorSponsoredCount: UserSponsorSponsoredCount,
  ): Promise<UserSponsorSponsoredCount> {
    return this.ormRepository.save(userSponsorSponsoredCount);
  }

  async create(
    userSponsorSponsoredCountData: ICreateUserSponsorSponsoredCountDTO,
  ): Promise<UserSponsorSponsoredCount> {
    const userSponsorSponsoredCount = this.ormRepository.create(
      userSponsorSponsoredCountData,
    );

    await this.ormRepository.save(userSponsorSponsoredCount);

    return userSponsorSponsoredCount;
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
