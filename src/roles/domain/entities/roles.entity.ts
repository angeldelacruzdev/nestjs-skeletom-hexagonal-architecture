import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity({ name: 'roles', schema: 'security' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @CreateDateColumn({
    nullable: false,
    name: 'created_at',
  })
  created_at?: Date;

  @CreateDateColumn({
    nullable: false,
    name: 'updated_at',
  })
  updated_at?: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'security.role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}
