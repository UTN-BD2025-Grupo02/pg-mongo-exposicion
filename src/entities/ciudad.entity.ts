//Crear la entidad ciudad 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Check } from 'typeorm';
import {LectorEntity} from './lector.entity';



@Entity('ciudad')
export class CiudadEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Check('"nombre" IS NOT NULL')
  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Check('"nroHabitante" > 0')
  @Column({ type: 'integer' })
  nroHabitante: number;

  @OneToMany(() => LectorEntity, (lector) => lector.ciudadId)
  lector: LectorEntity[];
}