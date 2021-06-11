import ICreateSponsoringDTO from '@modules/users/dtos/ICreateSponsoringDTO';
import ISponsoringRepository from '@modules/users/repositories/ISponsoringRepository';
import { getRepository, Repository } from 'typeorm';
import Sponsoring_Sponsored from '../entities/Sponsoring_Sponsored';

export default class PostgresSponsoringRepository
  implements ISponsoringRepository
{
  private ormRepository: Repository<Sponsoring_Sponsored>;

  constructor() {
    this.ormRepository = getRepository(Sponsoring_Sponsored);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async create(sponsoringData: ICreateSponsoringDTO): Promise<Sponsoring_Sponsored> {
    const userSponsoring = this.ormRepository.create(sponsoringData);

    await this.ormRepository.save(userSponsoring);

    return userSponsoring;
  }

  async findBySponsoringAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<Sponsoring_Sponsored | undefined> {
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
  ): Promise<Sponsoring_Sponsored[]> {
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
  ): Promise<Sponsoring_Sponsored[]> {
    const usersSponsored = await this.ormRepository.find({
      where: {
        sponsored_user_id: user_id,
      },
      relations: ['sponsor_userId'],
    });
    return usersSponsored;
  }
}
