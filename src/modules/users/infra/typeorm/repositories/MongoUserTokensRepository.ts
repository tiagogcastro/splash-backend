import IFindByTokenDTO from '@modules/users/dtos/IFindByTokenDTO';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import UserTokens from '../schemas/UserTokens';

export default class MongoUserTokensRepository
  implements IUserTokensRepository
{
  private ormRepository: MongoRepository<UserTokens>;

  constructor() {
    this.ormRepository = getMongoRepository(UserTokens, 'mongo');
  }

  async findByToken({
    token,
    user_id,
  }: IFindByTokenDTO): Promise<UserTokens | undefined> {
    const userTokens = await this.ormRepository.findOne({
      where: {
        token,
        user_id,
      },
    });
    return userTokens;
  }

  async generate(user_id: string): Promise<UserTokens> {
    const userTokens = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userTokens);

    return userTokens;
  }
}
