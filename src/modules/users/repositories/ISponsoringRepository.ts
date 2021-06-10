import ICreateSponsoringDTO from '../dtos/ICreateSponsoringDTO';
import Sponsoring_Sponsored from '../infra/typeorm/entities/Sponsoring_Sponsored';

export default interface ISponsoringRepository {
  findAllBySponsoringUserId(user_id: string): Promise<Sponsoring_Sponsored[]>;
  findAllBySponsoredUserId(user_id: string): Promise<Sponsoring_Sponsored[]>;
  findBySponsoringAndSponsored(
    sponsor_user_id: string,
    sponsored_user_id: string,
  ): Promise<Sponsoring_Sponsored | undefined>;
  create(sponsorData: ICreateSponsoringDTO): Promise<Sponsoring_Sponsored>;
  deleteById(id: string): Promise<void>;
}
