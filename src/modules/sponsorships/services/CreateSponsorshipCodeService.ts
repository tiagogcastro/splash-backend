import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import crypto from 'crypto';
import ICreateSponsorshipCodeServiceDTO from '../dtos/ICreateSponsorshipCodeServiceDTO';
import Sponsorship from '../infra/typeorm/entities/Sponsorship';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

export default class CreateSponsorshipCodeService {
  constructor(
    private usersRepository: IUsersRepository,
    private userBalanceRepository: IUserBalanceRepository,
    private sponsorshipsRepository: ISponsorshipsRepository,
  ) {}

  async execute({
    sponsor_user_id,
    amount,
    allow_withdrawal_balance = false,
  }: ICreateSponsorshipCodeServiceDTO): Promise<Sponsorship> {
    const sponsor = await this.usersRepository.findById(sponsor_user_id);

    const sponsorUserBalance = await this.userBalanceRepository.findByUserId(
      sponsor_user_id,
    );

    if (!sponsor) throw new AppError('The sponsor does not exist', 401);
    if (!sponsorUserBalance)
      throw new AppError('The sponsor balance does not exist', 401);
    if (sponsor.roles !== 'shop')
      throw new AppError('You are not allowed to access here', 401);
    if (amount < 1 || amount > 500) {
      throw new AppError(
        'You cannot report a balance of less than 1 or greater than 500',
        401,
      );
    }
    if (sponsorUserBalance.balance_amount < amount) {
      throw new AppError(
        'You cannot send an available amount that you do not have',
        400,
      );
    }
    if (sponsorUserBalance.total_balance < amount)
      throw new AppError('You cannot send an amount that you do not have', 400);

    sponsorUserBalance.total_balance -= amount;
    sponsorUserBalance.balance_amount -= amount;

    await this.userBalanceRepository.save(sponsorUserBalance);

    const code = crypto.randomBytes(3).toString('hex').toUpperCase();

    const checkSponsorship =
      await this.sponsorshipsRepository.findBySponsorshipCode(code);

    if (checkSponsorship) throw new AppError('Try again');

    const sponsorship = await this.sponsorshipsRepository.create({
      allow_withdrawal: allow_withdrawal_balance,
      amount,
      sponsor_user_id,
      sponsorship_code: code,
    });

    return sponsorship;
  }
}
