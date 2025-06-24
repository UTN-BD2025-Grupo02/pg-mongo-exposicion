//Crear la entidad ciudad 
import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany, JoinColumn } from 'typeorm';

@Entity('ciudad')
export class CiudadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'integer' })
  nroHabitante: number;
  

  @OneToMany(() => Lector)
  @JoinColumn({name: "lector"})
  lector: Lector;
}
