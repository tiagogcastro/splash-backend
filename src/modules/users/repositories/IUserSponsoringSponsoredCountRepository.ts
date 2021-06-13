import IUpdateSponsoringSponsoredCountDTO from '../dtos/IUpdateSponsoringSponsoredCountDTO';
import UserSponsoringSponsoredCount from '../infra/typeorm/entities/UserSponsoringSponsoredCount';

export default interface IUserSponsoringSponsoredCountRepository {
  updateCount(
    user_id: string,
    data: IUpdateSponsoringSponsoredCountDTO,
  ): Promise<UserSponsoringSponsoredCount | undefined>;
}
