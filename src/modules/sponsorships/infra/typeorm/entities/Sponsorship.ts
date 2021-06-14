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
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('sponsorship')
export default class Sponsorship {
  @PrimaryColumn()
  readonly id: string;

  @Column('uuid')
  sponsored_user_id: string;

  @Column('uuid')
  sponsor_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsored_user_id' })
  sponsored: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsor_user_id' })
  sponsor: User;

  @Column()
  amount: number;

  @Column({
    default: false,
  })
  @Column({
    nullable: true,
  })
  status: 'redeemed' | 'expired';

  @Column()
  allow_withdrawal: boolean;

  @Column({
    nullable: false,
  })
  sponsorship_code: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
