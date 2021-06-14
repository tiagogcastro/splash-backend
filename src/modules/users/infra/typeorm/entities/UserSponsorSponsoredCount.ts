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

@Entity('user_sponsor_sponsored_count')
class UserSponsorSponsoredCount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  sponsor_count: number;

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

export default UserSponsorSponsoredCount;
