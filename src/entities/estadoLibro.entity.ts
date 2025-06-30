import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('estado_libro')
export class EstadoLibroEntity extends BaseEntity {
@ObjectIdColumn()
  _id: ObjectId;

@Column()
  valor: string;
}