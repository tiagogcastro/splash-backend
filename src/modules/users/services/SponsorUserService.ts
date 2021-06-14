import AppError from '@shared/errors/AppError';
import SponsoringSponsored from '../infra/typeorm/entities/SponsorSponsored';
import ISponsoringSponsoredRepository from '../repositories/ISponsoringSponsoredRepository';
import IUsersRepository from '../repositories/IUsersRepository';

class SponsorUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsoringSponsoredRepository: ISponsoringSponsoredRepository,
  ) {}

  async execute(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<SponsoringSponsored | null> {
    const userLogged = await this.usersRepository.findById(sponsor_user_id);

    const userToSponsor = await this.usersRepository.findById(
      sponsored_user_id,
    );

    if (!userLogged) {
      throw new AppError('User not logged', 401);
    }

    if (!userToSponsor) {
      throw new AppError('User not exist', 401);
    }

    const sponsoringExist =
      await this.sponsoringSponsoredRepository.findBySponsoringAndSponsored(
        sponsor_user_id,
        sponsored_user_id,
      );

    if (sponsoringExist) {
      return sponsoringExist;
    }

    const sponsorUser = await this.sponsoringSponsoredRepository.create({
      sponsor_user_id,
      sponsored_user_id,
    });

    return sponsorUser;
  }
}

export default SponsorUserService;
