import AppError from '@shared/errors/AppError';
import Sponsoring from '../infra/typeorm/entities/Sponsoring';
import ISponsoringRepository from '../repositories/ISponsoringRepository';
import IUsersRepository from '../repositories/IUsersRepository';

class SponsorUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsoringRepository: ISponsoringRepository,
  ) {}

  async execute(
    sponsoring_userId: string,
    sponsored_userId: string,
  ): Promise<Sponsoring | null> {
    const userLogged = await this.usersRepository.findById(sponsoring_userId);

    const userToSponsor = await this.usersRepository.findById(sponsored_userId);

    if (!userLogged) {
      throw new AppError('User not logged', 401);
    }

    if (!userToSponsor) {
      throw new AppError('User not exist', 401);
    }

    const sponsoringExist =
      await this.sponsoringRepository.findBySponsoringAndSponsored(
        sponsoring_userId,
        sponsored_userId,
      );

    if (sponsoringExist) {
      return sponsoringExist;
    }

    const sponsorUser = await this.sponsoringRepository.create({
      sponsoring_userId,
      sponsored_userId,
    });

    return sponsorUser;
  }
}

export default SponsorUserService;
