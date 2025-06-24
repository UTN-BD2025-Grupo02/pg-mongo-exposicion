//Crear la entidad ciudad 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {LectorEntity} from './lector.entity';

@Entity('ciudad')
export class CiudadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'integer' })
  nroHabitante: number;

  @OneToMany(() => LectorEntity, (lector) => lector.ciudadId)
  lector: LectorEntity[];
}
