import ICreateSponsoringDTO from '@modules/users/dtos/ICreateSponsoringDTO';
import ISponsoringRepository from '@modules/users/repositories/ISponsoringRepository';
import { getRepository, Repository } from 'typeorm';
import Sponsoring from '../entities/Sponsoring';

export default class PostgresSponsoringRepository
  implements ISponsoringRepository
{
  private ormRepository: Repository<Sponsoring>;

  constructor() {
    this.ormRepository = getRepository(Sponsoring);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async create(sponsoringData: ICreateSponsoringDTO): Promise<Sponsoring> {
    const userSponsoring = this.ormRepository.create(sponsoringData);

    await this.ormRepository.save(userSponsoring);

    return userSponsoring;
  }

  async findBySponsoringAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<Sponsoring | undefined> {
    const userSponsoring = await this.ormRepository.findOne({
      where: {
        sponsor_user_id,
        sponsored_user_id,
      },
    });
    return userSponsoring;
  }

  async findAllBySponsoringUserId(
    sponsoring_user_id: string,
  ): Promise<Sponsoring[]> {
    const usersSponsoring = await this.ormRepository.find({
      where: {
        sponsoring_user_id,
      },
      relations: ['sponsored_userId'],
    });
    return usersSponsoring;
  }

  async findAllBySponsoredUserId(
    sponsored_user_id: string,
  ): Promise<Sponsoring[]> {
    const usersSponsored = await this.ormRepository.find({
      where: {
        sponsored_user_id,
      },
      relations: ['sponsor_userId'],
    });
    return usersSponsored;
  }
}
