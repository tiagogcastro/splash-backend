import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Like, Repository } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import User from '../entities/User';

export default class PostgresUsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }
}
