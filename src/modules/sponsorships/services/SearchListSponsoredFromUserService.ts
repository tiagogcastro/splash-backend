import User from '@modules/users/infra/typeorm/entities/User';
import ISearchListSponsoredFromUserDTO from '../dtos/ISearchListSponsoredFromUserDTO';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

export default class SearchListSponsoredFromUserService {
  constructor(private sponsorshipsRepository: ISponsorshipsRepository) {}

  async execute({
    username,
    sponsor_id,
  }: ISearchListSponsoredFromUserDTO): Promise<User[]> {
    const sponsorships =
      await this.sponsorshipsRepository.findAllSponsoredFromUser({
        sponsor_id,
      });

    const users = sponsorships.map(sponsorship => sponsorship.user);
    const usernames: string[] = [];

    const usersGrouped = users.filter(user => {
      const checkUsername = usernames.find(
        findUsername => findUsername === user.username,
      );
      if (checkUsername) return false;

      usernames.push(user.username);

      return true;
    });

    const usersFiltered = usersGrouped.filter(user => {
      const boolean = user.username.indexOf(username);
      if (boolean === -1) {
        return false;
      }
      return true;
    });
    return usersFiltered;
  }
}
