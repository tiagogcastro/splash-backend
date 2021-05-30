import AppError from '@shared/errors/AppError';
import { getRepository, Not } from 'typeorm';
import Sponsoring from '../infra/typeorm/entities/Sponsoring';
import User from '../infra/typeorm/entities/User';

class ListUsersSponsoredByUser {
  async execute(user_id: string): Promise<Sponsoring[] | undefined> {
    const usersRepository = getRepository(User);
    const sponsoringRepository = getRepository(Sponsoring);

    const user = await usersRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError('User not logged', 401);
    }

    const usersSponsored = await sponsoringRepository.find({
      where: {
        sponsoring_userId: user_id,
      },
      relations: ['user_id_sponsored'],
    });

    return usersSponsored;
  }
}

export default ListUsersSponsoredByUser;
