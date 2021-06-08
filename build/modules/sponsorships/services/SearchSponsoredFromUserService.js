"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SearchSponsoredFromUserService {
  constructor(sponsorshipsRepository, usersRepository) {
    this.sponsorshipsRepository = sponsorshipsRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    username,
    sponsor_id
  }) {// const sponsor = await this.usersRepository.findById(sponsor_id);
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

exports.default = SearchSponsoredFromUserService;