import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SponsoringSponsored from '../infra/typeorm/entities/SponsoringSponsored';
import ISponsoringSponsoredRepository from '../repositories/ISponsoringSponsoredRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersWhoSponsorTheUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SponsoringSponsoredRepository')
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
