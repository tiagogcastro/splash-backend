import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Permissions {
  user = 0,
  store,
}

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  username: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column()
  sponsoring: number;

  @Column()
  sponsored: number;

  @Column('varchar')
  phoneNumber?: string;

  @Column()
  money: number;

  @Column('int')
  permissions: Permissions;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
