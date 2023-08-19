import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { UserDetailsEntity } from './user-details.entity';

@Entity({ name: 'user', schema: 'auth' })
@Index('IDX_USER_EMAIL', ['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') // Usar UUID como clave primaria para escalabilidad
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToOne(() => UserDetailsEntity, userDetails => userDetails.user, { cascade: true })
  @JoinColumn()
  details: UserDetailsEntity; // Relación con los detalles del usuario
}
