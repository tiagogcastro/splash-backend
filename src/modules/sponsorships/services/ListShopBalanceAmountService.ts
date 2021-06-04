import Sponsorship from '../infra/typeorm/entities/Sponsorship';
import ISponsorshipsRepository from '../repositories/ISponsorshipsRepository';

export default class ListShopBalanceAmountService {
  constructor(private sponsorshipsRepository: ISponsorshipsRepository) {}

  async execute(user_id: string): Promise<Sponsorship[]> {
    const sponsorships =
      await this.sponsorshipsRepository.findAllSponsorshipsFromUser(user_id);

    const shops = sponsorships.filter(
      sponsorship =>
        sponsorship.sponsor.roles === 'shop' && sponsorship.amount !== 0,
    );

    return shops;
  }
}
