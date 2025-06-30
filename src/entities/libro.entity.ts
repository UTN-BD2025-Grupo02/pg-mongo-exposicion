import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('libro')
export class LibroEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  titulo: string;

  @Column('string')
  autor: string;

  @Column('string')
  editorial: string;
  // @ts-ignore
  @Column({type: 'objectId'})
  estado: ObjectId;
  // @ts-ignore
  @Column({type: 'objectId'})
  tipoLibro: ObjectId;


}