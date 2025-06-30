import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('estado_prestamo')
export class EstadoPrestamoEntity extends BaseEntity {
@ObjectIdColumn()
  _id: ObjectId;

@Column()
  valor: string;

}