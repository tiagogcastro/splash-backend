import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('user_tokens')
class UserTokens {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  token: string;

  @Column()
  email: string;

  @Column('uuid')
  user_id: string;

  @Column({
    default: true,
  })
  active: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.token) this.token = uuid();
  }
}

export default UserTokens;
