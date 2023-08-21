import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserDetails } from './user-details.entity';

@Entity({ name: 'user', schema: 'auth' })
@Index('IDX_USER_EMAIL', ['email'])
export class User {
  @PrimaryGeneratedColumn('uuid') // Usar UUID como clave primaria para escalabilidad
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  rt_hash: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'boolean' })
  created_at: boolean;

  @OneToOne("UserDetails", "user")
  userDetails: UserDetails; // Relación con los detalles del usuario
}
