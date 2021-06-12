import IFindValidTokenDTO from '@modules/users/dtos/IFindValidTokenDTO';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getMongoRepository, MongoRepository, Not } from 'typeorm';
import UserTokens from '../schemas/UserTokens';

export default class MongoUserTokensRepository
  implements IUserTokensRepository
{
  private ormRepository: MongoRepository<UserTokens>;

  constructor() {
    this.ormRepository = getMongoRepository(UserTokens, 'mongo');
  }

  async findValidToken({
    token,
    user_id,
  }: IFindValidTokenDTO): Promise<UserTokens | undefined> {
    const userTokens = await this.ormRepository.findOne({
      where: {
        token,
        user_id,
        active: true,
      },
    });
    return userTokens;
  }

  async save(userTokens: UserTokens): Promise<UserTokens> {
    return this.ormRepository.save(userTokens);
  }

  async generate(user_id: string): Promise<UserTokens> {
    const userTokens = this.ormRepository.create({
      user_id,
      active: true,
    });

    await this.ormRepository.save(userTokens);

    return userTokens;
  }
}
