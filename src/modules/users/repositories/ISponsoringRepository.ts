import ICreateSponsoringDTO from '../dtos/ICreateSponsoringDTO';
import Sponsoring from '../infra/typeorm/entities/Sponsoring';

export default interface ISponsoringRepository {
  findAllBySponsoringUserId(sponsor_user_id: string): Promise<Sponsoring[]>;
  findAllBySponsoredUserId(sponsored_user_id: string): Promise<Sponsoring[]>;
  findBySponsoringAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<Sponsoring | undefined>;
  create(sponsorData: ICreateSponsoringDTO): Promise<Sponsoring>;
  deleteById(id: string): Promise<void>;
}
