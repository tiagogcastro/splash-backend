import { 
  ObjectID, 
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('sponsoring')
class Sponsoring {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // No banco de dados
  @Column('uuid')
  sponsoring_userId: string;

  @Column('uuid')
  sponsored_userId: string;

  @ManyToOne(() => User)
  @JoinColumn({name: "sponsoring_userId"})
  user_id_sponsoring: string;
  
  @ManyToOne(() => User)
  @JoinColumn({name: "sponsored_userId"})
  user_id_sponsored: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}

export default Sponsoring;