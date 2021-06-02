import ICreateSponsorshipDTO from '../dtos/ICreateSponsorshipDTO';
import IFindAllSponsoredFromUserDTO from '../dtos/IFindAllSponsoredFromUserDTO';
import Sponsorship from '../infra/typeorm/entities/Sponsorship';

export default interface ISponsorshipsRepository {
  create(sponsorData: ICreateSponsorshipDTO): Promise<Sponsorship>;
  findAllSponsoredFromUser(
    findData: IFindAllSponsoredFromUserDTO,
  ): Promise<Sponsorship[]>;
}
