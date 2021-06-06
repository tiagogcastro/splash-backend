import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('sponsoring_sponsored')
class Sponsoring {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // No banco de dados
  @Column('uuid')
  sponsoring_user_id: string;
  
  @Column('uuid')
  sponsored_user_id: string;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsoring_user_id' })
  sponsoring_userId: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sponsored_user_id' })
  sponsored_userId: User;

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

export default Sponsoring;
