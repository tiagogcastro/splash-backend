import SponsorBalance from '@modules/users/infra/typeorm/entities/SponsorBalance';
import ISponsorBalanceRepository from '@modules/users/repositories/ISponsorBalanceRepository';
import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import AppError from '@shared/errors/AppError';

export default class ListShopBalanceAmountService {
  constructor(
    private sponsorBalanceRepository: ISponsorBalanceRepository,
    private userBalanceRepository: IUserBalanceRepository,
  ) {}

  async execute(user_id: string): Promise<SponsorBalance[]> {
    const sponsorBalance =
      await this.sponsorBalanceRepository.findAllSponsorBalanceBySponsoredUserId(
        user_id,
      );
    const userBalance = await this.userBalanceRepository.findByUserId(user_id);

    if (!userBalance) throw new AppError('User does not exist');

    const sponsorBalancePlusBalanceAvailable = sponsorBalance.map(
      sponsorBalanceItem => {
        return {
          ...sponsorBalanceItem,
          balance_amount:
            sponsorBalanceItem.balance_amount +
            userBalance.available_for_withdraw,
        };
      },
    );

    return sponsorBalancePlusBalanceAvailable;
  }
}
