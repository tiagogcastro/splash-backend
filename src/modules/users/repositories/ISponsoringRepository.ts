import ICreateSponsoringDTO from '../dtos/ICreateSponsoringDTO';
import Sponsoring from '../infra/typeorm/entities/Sponsoring';

export default interface ISponsoringRepository {
  findAllBySponsoringUserId(sponsoring_userId: string): Promise<Sponsoring[]>;
  findAllBySponsoredUserId(sponsored_userId: string): Promise<Sponsoring[]>;
  findBySponsoringAndSponsored(
    sponsoring_userId: string,
    sponsored_userId: string,
  ): Promise<Sponsoring | undefined>;
  create(sponsoringData: ICreateSponsoringDTO): Promise<Sponsoring>;
  deleteById(id: string): Promise<void>;
}
