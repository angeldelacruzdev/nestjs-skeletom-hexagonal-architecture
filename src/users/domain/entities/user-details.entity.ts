import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';


@Entity()
export class UserDetailsEntity {
    @PrimaryGeneratedColumn('uuid') // Usar UUID como clave primaria para escalabilidad
    id: string;

    @Column({ type: 'varchar', length: 100 })
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    // Otras columnas para más detalles

    @OneToOne(() => UserEntity, user => user.details)
    @JoinColumn()
    user: UserEntity; // Relación con la entidad de usuario
}