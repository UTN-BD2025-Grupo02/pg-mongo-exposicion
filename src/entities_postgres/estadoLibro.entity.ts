import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LibroEntity } from './libro.entity';

@Entity('estadoLibro')
export class EstadoLibroEntity {
@PrimaryGeneratedColumn()
  id: number;

@Column({ type: 'varchar', length: 50 })
  valor: string;

@OneToMany(() => LibroEntity, (libro) => libro.estado)
  libros: LibroEntity[];
}