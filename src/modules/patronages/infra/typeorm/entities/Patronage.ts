// import {
//   Column,
//   CreateDateColumn,
//   Double,
//   Entity,
//   PrimaryColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { v4 as uuid } from 'uuid';

// @Entity('patronages')
// export default class Patronage {
//   @PrimaryColumn()
//   readonly id: string;

//   @Column()
//   provider_id: string;

//   @Column()
//   recipient_id: string;

//   @Column()
//   money: Double;

//   @UpdateDateColumn()
//   updated_at: Date;

//   @CreateDateColumn()
//   created_at: Date;

//   constructor() {
//     if (!this.id) this.id = uuid();
//   }
// }
