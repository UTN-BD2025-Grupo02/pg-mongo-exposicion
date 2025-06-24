//Crear la entidad ciudad 
import { Entity, PrimaryGeneratedColumn, Column, IntegerType } from 'typeorm';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'integer' })
  nroHabitante: number;

}
