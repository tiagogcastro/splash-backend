import ICreateSponsorDTO from '../dtos/ICreateSponsorDTO';
import Sponsor from '../infra/typeorm/schemas/Sponsor';

export default interface ISponsorsRepository {
  create(sponsorData: ICreateSponsorDTO): Promise<Sponsor>;
}
