import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  Relation,
  CreateDateColumn,
} from 'typeorm';
import { UserDetails } from './user-details.entity';

@Entity({ name: 'user', schema: 'auth' })
@Index('IDX_USER_EMAIL', ['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  rt_hash: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
  })
  created_at: Date;

  @CreateDateColumn({
    nullable: false,
    name: 'updated_at',
  })
  updated_at: Date;

  @OneToOne(() => UserDetails, (metadata) => metadata.user, { cascade: true })
  details: Relation<UserDetails>;
}
