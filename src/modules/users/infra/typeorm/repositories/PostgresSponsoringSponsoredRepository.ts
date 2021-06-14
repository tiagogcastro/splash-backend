import ICreateSponsoringDTO from '@modules/users/dtos/ICreateSponsoringDTO';
import ISponsorSponsoredRepository from '@modules/users/repositories/ISponsoringSponsoredRepository';
import { getRepository, Repository } from 'typeorm';
import SponsorSponsored from '../entities/SponsorSponsored';

export default class PostgresSponsorSponsoredRepository
  implements ISponsorSponsoredRepository
{
  private ormRepository: Repository<SponsorSponsored>;

  constructor() {
    this.ormRepository = getRepository(SponsorSponsored);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async create(
    sponsoringData: ICreateSponsoringDTO,
  ): Promise<SponsorSponsored> {
    const userSponsoring = this.ormRepository.create(sponsoringData);

    await this.ormRepository.save(userSponsoring);

    return userSponsoring;
  }

  async findBySponsoringAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<SponsorSponsored | undefined> {
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
  ): Promise<SponsorSponsored[]> {
    const usersSponsoring = await this.ormRepository.find({
      where: {
        sponsor_user_id: user_id,
      },
      relations: ['sponsored'],
    });
    return usersSponsoring;
  }

  async findAllBySponsoredUserId(user_id: string): Promise<SponsorSponsored[]> {
    const usersSponsored = await this.ormRepository.find({
      where: {
        sponsored_user_id: user_id,
      },
      relations: ['sponsor'],
    });
    return usersSponsored;
  }
}
