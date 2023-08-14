// src/users/domain/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'users', schema: 'admin' })
@Index('idx_username', ['username'])
@Index('idx_email', ['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 })
  rt_hash: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: true })
  status: boolean;
}
