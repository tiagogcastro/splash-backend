import IUpdateSponsoringSponsoredCountDTO from '../dtos/IUpdateSponsoringSponsoredCountDTO';
import UserSponsorSponsoredCount from '../infra/typeorm/entities/UserSponsorSponsoredCount';

export default interface IUserSponsorSponsoredCountRepository {
  updateCount(
    user_id: string,
    data: IUpdateSponsoringSponsoredCountDTO,
  ): Promise<UserSponsorSponsoredCount | undefined>;
}
