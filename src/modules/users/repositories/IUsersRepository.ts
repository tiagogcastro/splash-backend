import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../infra/typeorm/entities/User';

export interface IUpdateResult {
  affected?: number;
  user: User;
}
export default interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findByEmail(email: string | undefined): Promise<User | undefined>;
  findById(id: string | number): Promise<User | undefined>;
  findByUsername(username: string | undefined): Promise<User | undefined>;
  findByPhoneNumber(phone_number: string): Promise<User | undefined>;
  deleteById(id: string): Promise<void>;
  update(id: string, userData: IUpdateUserDTO): Promise<IUpdateResult>;
  save(userData: User): Promise<User>;
}
