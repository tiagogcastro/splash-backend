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

@Entity('sponsor_balance')
class SponsorBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  balance_amount: number;

  @Column()
  sponsored_user_id: string;

  @Column()
  sponsor_shop_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsored_user_id' })
  sponsored: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsor_shop_id' })
  sponsor: User;

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

export default SponsorBalance;
