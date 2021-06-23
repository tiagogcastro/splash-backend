import IFindValidTokenDTO from '../dtos/IFindValidTokenDTO';
import IGenerateTokenDTO from '../dtos/IGenerateTokenDTO';
import UserTokens from '../infra/typeorm/schemas/UserTokens';

export default interface IUserTokensRepository {
  generate(generateData: IGenerateTokenDTO): Promise<UserTokens>;
  save(userTokens: UserTokens): Promise<UserTokens>;
  findValidToken(token: IFindValidTokenDTO): Promise<UserTokens | undefined>;
}
