import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('sponsoring_sponsored')
class SponsoringSponsored {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  sponsor_user_id: string;

  @Column('uuid')
  sponsored_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsor_user_id' })
  sponsor: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsored_user_id' })
  sponsored: User;

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

export default SponsoringSponsored;
