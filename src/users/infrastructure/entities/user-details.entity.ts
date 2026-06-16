import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  Relation,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_details', schema: 'auth' })
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: Relation<User>; // Relación con la entidad de usuario
}
