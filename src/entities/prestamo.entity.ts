import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, OneToMany,
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

  @OneToMany(() => DetallePrestamoEntity, (detallePrestamo) => detallePrestamo.prestamo, { cascade: true })
  @JoinColumn({ name: 'detalle' })
  detalles: DetallePrestamoEntity[];

  @ManyToOne(() => LectorEntity, (lector) => lector.prestamos, { nullable: false })
  @JoinColumn({ name: 'lector' })
  lector: LectorEntity;

  @ManyToOne(() => EstadoPrestamoEntity, (estadoPrestamo) => estadoPrestamo.prestamos, { nullable: false })
  @JoinColumn({ name: 'estado' })
  estado: EstadoPrestamoEntity;
}
