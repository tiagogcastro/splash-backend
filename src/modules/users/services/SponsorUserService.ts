import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Sponsoring from '../infra/typeorm/entities/Sponsoring';
import User from '../infra/typeorm/entities/User';

class SponsorUserService {
  async execute(
    sponsoring_userId: string,
    sponsored_userId: string,
  ): Promise<Sponsoring | null> {
    const usersRepository = getRepository(User);
    const sponsoringRepository = getRepository(Sponsoring);

    const userLogged = await usersRepository.findOne({
      where: {
        id: sponsoring_userId,
      },
    });

    const userToSponsor = await usersRepository.findOne({
      where: {
        id: sponsored_userId,
      },
    });

    if (!userLogged) {
      throw new AppError('User not logged', 401);
    }

    if (!userToSponsor) {
      throw new AppError('User not exist', 401);
    }

    const sponsoringExist = await sponsoringRepository.findOne({
      where: {
        sponsoring_userId,
        sponsored_userId,
      },
    });

    if (sponsoringExist) {
      return sponsoringExist;
    }

    const sponsorUser = sponsoringRepository.create({
      sponsoring_userId,
      sponsored_userId,
    });

    await sponsoringRepository.save(sponsorUser);

    return sponsorUser;
  }
}

export default SponsorUserService;
