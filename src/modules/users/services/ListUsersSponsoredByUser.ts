import AppError from '@shared/errors/AppError';
import Sponsoring_Sponsored from '../infra/typeorm/entities/Sponsoring_Sponsored';
import ISponsoringRepository from '../repositories/ISponsoringRepository';
import IUsersRepository from '../repositories/IUsersRepository';

class ListUsersSponsoredByUser {
  constructor(
    private usersRepository: IUsersRepository,
    private sponsoringRepository: ISponsoringRepository,
  ) {}

  async execute(user_id: string): Promise<Sponsoring_Sponsored[] | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not logged', 401);
    }

    const usersSponsored =
      await this.sponsoringRepository.findAllBySponsoringUserId(user_id);

    return usersSponsored;
  }
}

export default ListUsersSponsoredByUser;
