import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string | number): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  save(userData: User): Promise<User>;
}
