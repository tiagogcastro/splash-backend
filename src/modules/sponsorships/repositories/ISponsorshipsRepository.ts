import ICreateSponsorshipDTO from '../dtos/ICreateSponsorshipDTO';
import Sponsorship from '../infra/typeorm/entities/Sponsorship';

export default interface ISponsorshipsRepository {
  create(sponsorData: ICreateSponsorshipDTO): Promise<Sponsorship>;
  findAllSponsoredFromUser(sponsor_user_id: string): Promise<Sponsorship[]>;
}
