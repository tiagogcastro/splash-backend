import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SponsoringSponsored from '../infra/typeorm/entities/SponsoringSponsored';
import ISponsoringSponsoredRepository from '../repositories/ISponsoringSponsoredRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersSponsoredByUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SponsoringSponsoredRepository')
    private sponsoringSponsoredRepository: ISponsoringSponsoredRepository,
  ) {}

  async execute(user_id: string): Promise<SponsoringSponsored[] | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const usersSponsored =
      await this.sponsoringSponsoredRepository.findAllBySponsoringUserId(
        user_id,
      );

    return usersSponsored;
  }
}

export default ListUsersSponsoredByUser;
