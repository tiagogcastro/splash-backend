import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUsersRepository, {
  IUpdateResult,
} from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import User from '../entities/User';

export default class PostgresUsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async update(id: string, userData: IUpdateUserDTO): Promise<IUpdateResult> {
    const { affected } = await this.ormRepository.update(id, userData);

    return { affected };
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string | undefined): Promise<User | undefined> {
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

  async findByUsername(
    username: string | undefined,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async findByPhoneNumber(phone_number: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        phone_number,
      },
    });
    return user;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async save(userData: User): Promise<User> {
    const user = await this.ormRepository.save(userData);
    return user;
  }
}
