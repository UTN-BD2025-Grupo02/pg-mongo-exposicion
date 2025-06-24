import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrestamoEntity } from './prestamo.entity';

@Entity('estadoLibro')
export class EstadoLibroEntity {
@PrimaryGeneratedColumn()
  id: number;

@Column({ type: 'varchar', length: 50 })
  valor: string;

@OneToMany(() => PrestamoEntity, (prestamo) => prestamo.estado)
  libros: PrestamoEntity[];
}