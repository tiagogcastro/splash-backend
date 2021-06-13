import AppError from '@shared/errors/AppError';
import SponsoringSponsored from '../infra/typeorm/entities/SponsoringSponsored';
import ISponsoringSponsoredRepository from '../repositories/ISponsoringSponsoredRepository';
import IUsersRepository from '../repositories/IUsersRepository';

class ListUsersWhoSponsorTheUser {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsoringSponsoredRepository: ISponsoringSponsoredRepository,
  ) {}

  async execute(user_id: string): Promise<SponsoringSponsored[] | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not logged', 401);
    }
    const usersSponsoring =
      await this.sponsoringSponsoredRepository.findAllBySponsoredUserId(
        user_id,
      );

    return usersSponsoring;
  }
}

export default ListUsersWhoSponsorTheUser;
