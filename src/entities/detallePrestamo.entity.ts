import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { LibroEntity } from './libro.entity';
import { PrestamoEntity } from './prestamo.entity';

@Entity('DetallePrestamo')
export class DetallePrestamoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LibroEntity, { nullable: false })
  @JoinColumn({ name: 'libro' })
  libro: LibroEntity;

  @ManyToOne(() => PrestamoEntity, (prestamo) => prestamo.detalles, { nullable: false })
  @JoinColumn({ name: 'prestamo' })
  prestamo: PrestamoEntity;
}