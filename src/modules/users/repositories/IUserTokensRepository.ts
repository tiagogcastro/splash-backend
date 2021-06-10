import IFindByTokenDTO from '../dtos/IFindByTokenDTO';
import UserTokens from '../infra/typeorm/schemas/UserTokens';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserTokens>;
  findByToken(token: IFindByTokenDTO): Promise<UserTokens | undefined>;
}
