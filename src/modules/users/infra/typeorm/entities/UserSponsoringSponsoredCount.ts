import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('user_sponsoring_sponsored_count')
class UserSponsoringSponsoredCount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  sponsoring_count: number;

  @Column()
  sponsored_count: number;

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

export default UserSponsoringSponsoredCount;
