import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

enum Permissions {
  user = 'user',
  shop = 'shop',
  admin = 'admin',
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

  // @Column()
  // avatar: string;

  @Column()
  password?: string;

  @Column({ default: 0 })
  sponsoring: number;

  @Column({ default: 0 })
  sponsored: number;

  @Column('varchar')
  phoneNumber?: string;

  @Column({ default: 0 })
  money: number;

  @Column({
    type: 'enum',
    enum: Permissions,
    default: 'user',
  })
  permissions: Permissions;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
