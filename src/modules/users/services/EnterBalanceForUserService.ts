import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import AppError from '@shared/errors/AppError';
import ISponsorBalanceRepository from '../repositories/ISponsorBalanceRepository';
import IUserBalanceRepository from '../repositories/IUserBalanceRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  balance_amount?: number;
  user_id: string;
  sponsorship_code?: string;
}

export default class EnterBalanceForUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private userBalanceRepository: IUserBalanceRepository,
    private sponsorBalanceRepository: ISponsorBalanceRepository,
    private sponsorshipsRepository: ISponsorshipsRepository,
  ) {}

  public async execute({
    user_id,
    balance_amount = 0,
    sponsorship_code,
  }: Request): Promise<void> {
    const sponsorship =
      await this.sponsorshipsRepository.findByUnreadSponsorshipCode(
        sponsorship_code,
      );
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 400);

    if (!balance_amount) {
      if (!sponsorship)
        throw new AppError('This sponsorship code does not exist', 400);

      if (
        sponsorship.status === 'redeemed' ||
        sponsorship.status === 'expired'
      ) {
        throw new AppError(
          'This sponsorship code does not available or has already expired',
          400,
        );
      }
      if (sponsorship.allow_withdrawal) {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorship.amount,
          available_for_withdraw: sponsorship.amount,
        });
      } else {
        await this.userBalanceRepository.create({
          user_id: user.id,
          total_balance: sponsorship.amount,
        });
        await this.sponsorBalanceRepository.create({
          sponsor_shop_id: sponsorship.sponsor_user_id,
          sponsored_user_id: user.id,
          balance_amount: sponsorship.amount,
        });
      }
      sponsorship.sponsored_user_id = user.id;
      sponsorship.status = 'redeemed';

      await this.sponsorshipsRepository.save(sponsorship);
    }

    const userBalance = await this.userBalanceRepository.findByUserId(user.id);

    if (userBalance) {
      userBalance.total_balance += balance_amount;
      userBalance.available_for_withdraw += balance_amount;

      await this.userBalanceRepository.save(userBalance);
    }
  }
}
