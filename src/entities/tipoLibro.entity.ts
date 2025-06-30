import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('tipo_libro')
export class TipoLibroEntity extends BaseEntity {
  
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  nombre: string;

  @Column('string')
  descripcion: string;

}
