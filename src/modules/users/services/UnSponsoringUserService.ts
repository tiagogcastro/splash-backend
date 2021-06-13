import AppError from '@shared/errors/AppError';
import ISponsoringSponsoredRepository from '../repositories/ISponsoringSponsoredRepository';
import IUsersRepository from '../repositories/IUsersRepository';

class UnSponsoringUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsoringSponsoredRepository: ISponsoringSponsoredRepository,
  ) {}

  async execute(
    user_id_to_remove_sponsor: string,
    user_id_to_remove_sponsored: string,
  ): Promise<void> {
    const userLogged = await this.usersRepository.findById(
      user_id_to_remove_sponsor,
    );

    const userToUnSponsoring = await this.usersRepository.findById(
      user_id_to_remove_sponsored,
    );

    if (!userLogged) {
      throw new AppError('User not logged', 401);
    }

    if (!userToUnSponsoring) {
      throw new AppError('User not exist', 401);
    }

    const sponsoringExist =
      await this.sponsoringSponsoredRepository.findBySponsoringAndSponsored(
        user_id_to_remove_sponsor,
        user_id_to_remove_sponsored,
      );

    if (sponsoringExist) {
      await this.sponsoringSponsoredRepository.deleteById(sponsoringExist.id);
    }
  }
}

export default UnSponsoringUserService;
