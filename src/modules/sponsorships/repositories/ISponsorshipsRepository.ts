import ICreateSponsorDTO from '../dtos/ICreateSponsorDTO';
import Sponsor from '../infra/typeorm/entities/Sponsorship';

export default interface ISponsorshipsRepository {
  create(sponsorData: ICreateSponsorDTO): Promise<Sponsor>;
}
