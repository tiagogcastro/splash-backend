import IFindValidTokenDTO from '../dtos/IFindValidTokenDTO';
import UserTokens from '../infra/typeorm/schemas/UserTokens';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserTokens>;
  save(userTokens: UserTokens): Promise<UserTokens>;
  findValidToken(token: IFindValidTokenDTO): Promise<UserTokens | undefined>;
}
