import IFindSponsorBalanceDTO from '@modules/users/dtos/IFindSponsorBalanceDTO';
import ISponsorBalanceRepository from '@modules/users/repositories/ISponsorBalanceRepository';
import { getRepository, Not, Repository } from 'typeorm';
import ICreateSponsorBalanceDTO from '../../../dtos/ICreateSponsorBalanceDTO';
import UserBalance from '../entities/SponsorBalance';

export default class PostgresSponsorBalanceRepository
  implements ISponsorBalanceRepository
{
  private ormRepository: Repository<UserBalance>;

  constructor() {
    this.ormRepository = getRepository(UserBalance);
  }

  async findAllSponsorBalanceBySponsoredUserId(
    sponsored_user_id: string,
  ): Promise<UserBalance[]> {
    const sponsorBalance = await this.ormRepository.find({
      where: {
        sponsored_user_id,
        balance_amount: Not(0),
      },
      relations: ['sponsor'],
    });

    return sponsorBalance;
  }

  async findSponsorBalance({
    sponsor_shop_id,
    sponsored_user_id,
  }: IFindSponsorBalanceDTO): Promise<UserBalance | undefined> {
    const sponsorBalance = await this.ormRepository.findOne({
      sponsor_shop_id,
      sponsored_user_id,
    });

    return sponsorBalance;
  }

  async create({
    balance_amount,
    sponsor_shop_id,
    sponsored_user_id,
  }: ICreateSponsorBalanceDTO): Promise<UserBalance> {
    const sponsorBalance = this.ormRepository.create({
      balance_amount,
      sponsor_shop_id,
      sponsored_user_id,
    });

    await this.ormRepository.save(sponsorBalance);

    return sponsorBalance;
  }

  async save(sponsorBalance: UserBalance): Promise<UserBalance> {
    return this.ormRepository.save(sponsorBalance);
  }
}
