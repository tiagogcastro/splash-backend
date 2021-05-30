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
<<<<<<< HEAD

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
=======

  @Column()
  phoneNumber: string;

  @Column()
  password?: string;
>>>>>>> 5a23fea89c6c1577e9554ad0f53b316cd545740a

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
