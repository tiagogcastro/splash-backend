import uploadConfig from '@config/upload';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

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
  // avatar?: string;

  @Exclude()
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

  // @Expose({ name: 'avatar_url' })
  // getAvatarUrl(): string | null {
  //   if (!this.avatar) return null;

  //   switch (uploadConfig.driver) {
  //     case 'disk':
  //       return `${process.env.APP_API_URL}/static/${this.avatar}`;
  //     case 's3':
  //       return ``;

  //     default:
  //       return null;
  //   }
  // }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
