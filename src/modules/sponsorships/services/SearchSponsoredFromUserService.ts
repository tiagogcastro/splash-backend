import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import ISearchSponsoredFromUserDTO from '../dtos/ISearchSponsoredFromUserDTO';
import Sponsorship from '../infra/typeorm/entities/Sponsorship';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

export default class SearchSponsoredFromUserService {
  constructor(
    private sponsorshipsRepository: ISponsorshipsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    username,
    sponsor_id,
  }: ISearchSponsoredFromUserDTO): Promise<void> {
    // const sponsor = await this.usersRepository.findById(sponsor_id);
    // const repository = getRepository(User);
    // if (!sponsor) {
    //   throw new AppError('User does not exist', 401);
    // }
    // const sponsorships =
    //   await this.sponsorshipsRepository.findAllSponsoredFromUser(sponsor_id);
    // const users = sponsorships.map(sponsorship => sponsorship.sponsored);
    // const users_id: string[] = [];
    // const usersGrouped = users.filter(user => {
    //   const checkUsername = users_id.find(
    //     findUsername => findUsername === user.id,
    //   );
    //   if (checkUsername) return false;
    //   users_id.push(user.id);
    //   return true;
    // });
    // const usersFiltered = usersGrouped.filter(user => {
    //   const boolean = user.username.indexOf(username);
    //   if (boolean === -1) {
    //     return false;
    //   }
    //   return true;
    // });
    // return usersGrouped;
  }
}
