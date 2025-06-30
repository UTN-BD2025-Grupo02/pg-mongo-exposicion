//Crear la entidad ciudad 
import { Entity, BaseEntity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';


@Entity('ciudad')
export class CiudadEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nombre: string;

  @Column()
  nroHabitante: number;
}
