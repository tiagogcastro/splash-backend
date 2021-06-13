import ICreateSponsoringDTO from '@modules/users/dtos/ICreateSponsoringDTO';
import ISponsoringSponsoredRepository from '@modules/users/repositories/ISponsoringSponsoredRepository';
import { getRepository, Repository } from 'typeorm';
import SponsoringSponsored from '../entities/SponsoringSponsored';

export default class PostgresSponsoringSponsoredRepository
  implements ISponsoringSponsoredRepository
{
  private ormRepository: Repository<SponsoringSponsored>;

  constructor() {
    this.ormRepository = getRepository(SponsoringSponsored);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async create(
    sponsoringData: ICreateSponsoringDTO,
  ): Promise<SponsoringSponsored> {
    const userSponsoring = this.ormRepository.create(sponsoringData);

    await this.ormRepository.save(userSponsoring);

    return userSponsoring;
  }

  async findBySponsoringAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<SponsoringSponsored | undefined> {
    const userSponsoring = await this.ormRepository.findOne({
      where: {
        sponsor_user_id,
        sponsored_user_id,
      },
    });
    return userSponsoring;
  }

  async findAllBySponsoringUserId(
    user_id: string,
  ): Promise<SponsoringSponsored[]> {
    const usersSponsoring = await this.ormRepository.find({
      where: {
        sponsor_user_id: user_id,
      },
      relations: ['sponsored_userId'],
    });
    return usersSponsoring;
  }

  async findAllBySponsoredUserId(
    user_id: string,
  ): Promise<SponsoringSponsored[]> {
    const usersSponsored = await this.ormRepository.find({
      where: {
        sponsored_user_id: user_id,
      },
      relations: ['sponsor_userId'],
    });
    return usersSponsored;
  }
}
