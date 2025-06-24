import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LectorEntity } from './lector.entity';
import { EstadoPrestamoEntity } from './estadoPrestamo.entity';
import { DetallePrestamoEntity } from './detallePrestamo.entity';

@Entity('Prestamo')
export class PrestamoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaPrestamo: Date;

  @Column({ type: 'date' })
  fechaDevolucion: Date;

  @Column({ type: 'date', nullable: true })
  fechaDevolucionReal: Date;

  @ManyToOne(() => DetallePrestamoEntity, { nullable: true })
  @JoinColumn({ name: 'detalle' })
  detalle: DetallePrestamoEntity;

  @ManyToOne(() => LectorEntity, { nullable: false })
  @JoinColumn({ name: 'lector' })
  lector: LectorEntity;

  @ManyToOne(() => EstadoPrestamoEntity, { nullable: false })
  @JoinColumn({ name: 'estado' })
  estado: EstadoPrestamoEntity;
}
