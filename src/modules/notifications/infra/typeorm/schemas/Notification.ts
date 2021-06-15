import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export default class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  subject: string;

  @Column('uuid')
  recipient_id: string;

  @Column('uuid')
  sender_id: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  sender: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
