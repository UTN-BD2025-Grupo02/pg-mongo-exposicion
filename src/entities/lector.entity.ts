import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('lector')
export class LectorEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;


  @Column()
  nombre: string;


  @Column()
  apellido: string;

  @Column()
  ciudadId: ObjectId;
}
