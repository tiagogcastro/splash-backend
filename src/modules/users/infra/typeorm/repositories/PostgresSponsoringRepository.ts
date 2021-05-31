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
    sponsoring_userId: string,
    sponsored_userId: string,
  ): Promise<Sponsoring | undefined> {
    const userSponsoring = await this.ormRepository.findOne({
      where: {
        sponsoring_userId,
        sponsored_userId,
      },
    });
    return userSponsoring;
  }

  async findAllBySponsoringUserId(
    sponsoring_userId: string,
  ): Promise<Sponsoring[]> {
    const usersSponsoring = await this.ormRepository.find({
      where: {
        sponsoring_userId,
      },
      relations: ['user_id_sponsored'],
    });
    return usersSponsoring;
  }

  async findAllBySponsoredUserId(
    sponsored_userId: string,
  ): Promise<Sponsoring[]> {
    const usersSponsored = await this.ormRepository.find({
      where: {
        sponsored_userId,
      },
      relations: ['user_id_sponsoring'],
    });
    return usersSponsored;
  }
}
