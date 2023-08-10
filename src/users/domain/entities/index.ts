// src/users/domain/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
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
}
