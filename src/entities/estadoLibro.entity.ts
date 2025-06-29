import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LibroEntity } from './libro.entity';

@Entity('estado_libro')
export class EstadoLibroEntity extends BaseEntity {
@PrimaryGeneratedColumn()
  id: number;

@Column({ type: 'varchar', length: 50 })
  valor: string;

@OneToMany(() => LibroEntity, (libro) => libro.estado)
  libros: LibroEntity[];
}