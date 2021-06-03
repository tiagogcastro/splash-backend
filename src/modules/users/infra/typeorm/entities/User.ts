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

  @Column({
    nullable: true,
  })
  name?: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email?: string;

  @Column({
    unique: true,
    nullable: true,
  })
  avatar?: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    default: 0,
  })
  sponsoring: number;

  @Column({
    default: 0,
  })
  sponsored: number;

  @Column({
    unique: true,
  })
  phone_number?: string;

  @Column({
    default: 0,
  })
  total_balance: number;

  @Column({
    default: 0,
  })
  balance_amount: number;

  @Column({
    type: 'enum',
    enum: Permissions,
    nullable: true,
  })
  permissions: Permissions;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/static/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;

      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
