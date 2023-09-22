import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'permissions', schema: 'security' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

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

  // Puedes añadir más propiedades si es necesario, como descripción, ámbitos, etc.
}
