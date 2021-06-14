import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SponsorSponsored from '../infra/typeorm/entities/SponsorSponsored';
import ISponsorSponsoredRepository from '../repositories/ISponsorSponsoredRepository';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class ListUsersSponsoredByUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SponsorSponsoredRepository')
    private sponsorSponsoredRepository: ISponsorSponsoredRepository,
  ) {}

  async execute(user_id: string): Promise<SponsorSponsored[] | undefined> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const usersSponsored =
      await this.sponsorSponsoredRepository.findAllBySponsoringUserId(user_id);

    return usersSponsored;
  }
}

export default ListUsersSponsoredByUser;
