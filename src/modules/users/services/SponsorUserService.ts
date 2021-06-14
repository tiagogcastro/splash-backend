import AppError from '@shared/errors/AppError';
import SponsorSponsored from '../infra/typeorm/entities/SponsorSponsored';
import ISponsorSponsoredRepository from '../repositories/ISponsorSponsoredRepository';
import IUsersRepository from '../repositories/IUserRepository';

class SponsorUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsorSponsoredRepository: ISponsorSponsoredRepository,
  ) {}

  async execute(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<SponsorSponsored | null> {
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
      await this.sponsorSponsoredRepository.findBySponsorAndSponsored(
        sponsor_user_id,
        sponsored_user_id,
      );

    if (sponsoringExist) {
      return sponsoringExist;
    }

    const sponsorUser = await this.sponsorSponsoredRepository.create({
      sponsor_user_id,
      sponsored_user_id,
    });

    return sponsorUser;
  }
}

export default SponsorUserService;
