// src/users/domain/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'users', schema: 'admin' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
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
