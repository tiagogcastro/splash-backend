import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Sponsoring from '../infra/typeorm/entities/Sponsoring';
import User from '../infra/typeorm/entities/User';

class UnSponsoringUserService {
  async execute(
    user_id_to_remove_sponsor: string,
    user_id_to_remove_sponsored: string,
  ): Promise<void> {
    const usersRepository = getRepository(User);
    const sponsoringRepository = getRepository(Sponsoring);

    const userLogged = await usersRepository.findOne({
      where: {
        id: user_id_to_remove_sponsor,
      },
    });

    const userToUnSponsoring = await usersRepository.findOne({
      where: {
        id: user_id_to_remove_sponsored,
      },
    });

    if (!userLogged) {
      throw new AppError('User not logged', 401);
    }

    if (!userToUnSponsoring) {
      throw new AppError('User not exist', 401);
    }

    const sponsoringExist = await sponsoringRepository.findOne({
      where: {
        sponsoring_userId: user_id_to_remove_sponsor,
        sponsored_userId: user_id_to_remove_sponsored,
      },
    });

    if (sponsoringExist) {
      await sponsoringRepository.delete(sponsoringExist.id);
    }
  }
}

export default UnSponsoringUserService;
