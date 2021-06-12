import AppError from '@shared/errors/AppError';
import Sponsoring_Sponsored from '../infra/typeorm/entities/Sponsoring_Sponsored';
import ISponsoringRepository from '../repositories/ISponsoringRepository';
import IUsersRepository from '../repositories/IUsersRepository';

class SponsorUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsoringRepository: ISponsoringRepository,
  ) {}

  async execute(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<Sponsoring_Sponsored | null> {
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
      await this.sponsoringRepository.findBySponsoringAndSponsored(
        sponsor_user_id,
        sponsored_user_id,
      );

    if (sponsoringExist) {
      return sponsoringExist;
    }

    const sponsorUser = await this.sponsoringRepository.create({
      sponsor_user_id,
      sponsored_user_id,
    });

    return sponsorUser;
  }
}

export default SponsorUserService;
