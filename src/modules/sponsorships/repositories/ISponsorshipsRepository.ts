import ICreateSponsorshipDTO from '../dtos/ICreateSponsorshipDTO';
import Sponsorship from '../infra/typeorm/entities/Sponsorship';

export default interface ISponsorshipsRepository {
  create(sponsorData: ICreateSponsorshipDTO): Promise<Sponsorship>;
}
