import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Libro } from './libro.entity';
import { Prestamo } from './prestamo.entity';

@Entity('DetallePrestamo')
export class DetallePrestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Libro, { nullable: false })
  @JoinColumn({ name: 'libro' })
  libro: Libro;

  @ManyToOne(() => Prestamo, { nullable: false })
  @JoinColumn({ name: 'prestamo' })
  prestamo: Prestamo;
}