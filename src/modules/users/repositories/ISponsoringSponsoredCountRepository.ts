import IUpdateSponsoringSponsoredCountDTO from '../dtos/IUpdateSponsoringSponsoredCountDTO';
import SponsoringSponsoredCount from '../infra/typeorm/entities/SponsoringSponsoredCount';

export default interface ISponsoringSponsoredCountRepository {
  updateCount(
    user_id: string,
    data: IUpdateSponsoringSponsoredCountDTO,
  ): Promise<SponsoringSponsoredCount | undefined>;
}
