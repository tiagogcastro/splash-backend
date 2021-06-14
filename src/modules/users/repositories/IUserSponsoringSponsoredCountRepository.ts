import IUpdateSponsoringSponsoredCountDTO from '../dtos/IUpdateSponsoringSponsoredCountDTO';
import ICreateUserSponsorSponsoredCountDTO from '../dtos/ICreateUserSponsorSponsoredCountDTO';
import UserSponsorSponsoredCount from '../infra/typeorm/entities/UserSponsorSponsoredCount';

export default interface IUserSponsorSponsoredCountRepository {
  updateCount(
    user_id: string,
    data: IUpdateSponsoringSponsoredCountDTO,
  ): Promise<UserSponsorSponsoredCount | undefined>;
  findByUserId(user_id: string): Promise<UserSponsorSponsoredCount | undefined>;
  create(
    userSponsorSponsoredCountData: ICreateUserSponsorSponsoredCountDTO,
  ): Promise<UserSponsorSponsoredCount>;
  save(
    userSponsorSponsoredCount: UserSponsorSponsoredCount,
  ): Promise<UserSponsorSponsoredCount>;
}
