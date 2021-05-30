import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
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
