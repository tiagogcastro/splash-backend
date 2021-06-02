import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('sponsorships')
export default class Sponsorship {
  @PrimaryColumn()
  readonly id: string;

  @Column('uuid')
  user_recipient_id: string;

  @Column('uuid')
  sponsor_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_recipient_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsor_id' })
  sponsor: User;

  @Column()
  your_sponsor_balance: number;

  @Column()
  withdrawal_balance_available: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
