import ICreateSponsoringDTO from '../dtos/ICreateSponsoringDTO';
import SponsoringSponsored from '../infra/typeorm/entities/SponsoringSponsored';

export default interface ISponsoringSponsoredRepository {
  findAllBySponsoringUserId(user_id: string): Promise<SponsoringSponsored[]>;
  findAllBySponsoredUserId(user_id: string): Promise<SponsoringSponsored[]>;
  findBySponsoringAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<SponsoringSponsored | undefined>;
  create(sponsorData: ICreateSponsoringDTO): Promise<SponsoringSponsored>;
  deleteById(id: string): Promise<void>;
}
