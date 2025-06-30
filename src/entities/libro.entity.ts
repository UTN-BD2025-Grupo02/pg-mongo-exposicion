import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('libro')
export class LibroEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column()
  editorial: string;

  @Column()
  estado: ObjectId;

  @Column()
  tipoLibro: ObjectId;


}