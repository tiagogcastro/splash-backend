import AppError from '@shared/errors/AppError';
import ISponsorSponsoredRepository from '../repositories/ISponsorSponsoredRepository';
import IUserRepository from '../repositories/IUserRepository';

class UnSponsoringUserService {
  constructor(
    private userRepository: IUserRepository,
    private sponsorSponsoredRepository: ISponsorSponsoredRepository,
  ) {}

  async execute(
    user_id_to_remove_sponsor: string,
    user_id_to_remove_sponsored: string,
  ): Promise<void> {
    const userLogged = await this.userRepository.findById(
      user_id_to_remove_sponsor,
    );

    const userToUnSponsoring = await this.userRepository.findById(
      user_id_to_remove_sponsored,
    );

    if (!userLogged) {
      throw new AppError('User not logged', 401);
    }

    if (!userToUnSponsoring) {
      throw new AppError('User not exist', 401);
    }

    const sponsoringExist =
      await this.sponsorSponsoredRepository.findBySponsorAndSponsored(
        user_id_to_remove_sponsor,
        user_id_to_remove_sponsored,
      );

    if (sponsoringExist) {
      await this.sponsorSponsoredRepository.deleteById(sponsoringExist.id);
    }
  }
}

export default UnSponsoringUserService;
