//Crear la entidad ciudad 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Check } from 'typeorm';
import {LectorEntity} from './lector.entity';



@Entity('ciudad')
@Check('"nroHabitante": > 0')
@Check('"nombre" IS NOT NULL')
export class CiudadEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'integer' })
  nroHabitante: number;

  @OneToMany(() => LectorEntity, (lector) => lector.ciudadId)
  lector: LectorEntity[];
}
