import ICreateSponsoringDTO from '../dtos/ICreateSponsoringDTO';
import SponsorSponsored from '../infra/typeorm/entities/SponsorSponsored';

export default interface ISponsorSponsoredRepository {
  findAllBySponsoringUserId(user_id: string): Promise<SponsorSponsored[]>;
  findAllBySponsoredUserId(user_id: string): Promise<SponsorSponsored[]>;
  findBySponsorAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<SponsorSponsored | undefined>;
  create(sponsorData: ICreateSponsoringDTO): Promise<SponsorSponsored>;
  deleteById(id: string): Promise<void>;
}
