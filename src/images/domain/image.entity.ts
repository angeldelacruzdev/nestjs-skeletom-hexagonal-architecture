import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'fileName' })
  fileName: string;

  @Column('int')
  size: number;
}
