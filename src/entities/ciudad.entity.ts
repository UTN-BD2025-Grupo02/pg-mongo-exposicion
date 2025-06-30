//Crear la entidad ciudad 
import { Entity, BaseEntity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';


@Entity('ciudad')
export class CiudadEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  nombre: string;

  @Column('number')
  nroHabitante: number;
}
