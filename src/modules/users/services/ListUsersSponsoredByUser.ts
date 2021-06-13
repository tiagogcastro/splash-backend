import AppError from '@shared/errors/AppError';
import Sponsoring_Sponsored from '../infra/typeorm/entities/SponsoringSponsored';
import ISponsoringSponsoredRepository from '../repositories/ISponsoringSponsoredRepository';
import IUsersRepository from '../repositories/IUsersRepository';

class ListUsersSponsoredByUser {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsoringSponsoredRepository: ISponsoringSponsoredRepository,
  ) {}

  async execute(user_id: string): Promise<Sponsoring_Sponsored[] | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not logged', 401);
    }

    const usersSponsored =
      await this.sponsoringSponsoredRepository.findAllBySponsoringUserId(
        user_id,
      );

    return usersSponsored;
  }
}

export default ListUsersSponsoredByUser;
