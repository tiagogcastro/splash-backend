import ICreateSponsorshipDTO from '../dtos/ICreateSponsorshipDTO';
import IUpdateSponsorshipDTO from '../dtos/IUpdateSponsorshipDTO';
import Sponsorship from '../infra/typeorm/entities/Sponsorship';

export default interface ISponsorshipsRepository {
  create(sponsorData: ICreateSponsorshipDTO): Promise<Sponsorship>;
  findAllSponsoredFromUser(sponsor_user_id: string): Promise<Sponsorship[]>;
  findBySponsorshipCode(sponsorship_code: string): Promise<Sponsorship | undefined>;
  updateSponsorship(sponsor_user_id: string, data: IUpdateSponsorshipDTO): Promise<Sponsorship | undefined>;
}
