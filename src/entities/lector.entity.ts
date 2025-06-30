import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('lector')
export class LectorEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;


  @Column('string')
  nombre: string;


  @Column('string')
  apellido: string;

  // @ts-ignore
  @Column({type: 'objectId'})
  ciudadId: ObjectId;
}
