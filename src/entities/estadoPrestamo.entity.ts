import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrestamoEntity } from './prestamo.entity';

@Entity('estadoPrestamo')
export class EstadoPrestamoEntity extends BaseEntity {
@PrimaryGeneratedColumn()
  id: number;

@Column({ type: 'varchar', length: 50 })
  valor: string;

@OneToMany(() => PrestamoEntity, (prestamo) => prestamo.estado)
  prestamos: PrestamoEntity[];
}