import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';


@Entity('detalle_prestamo')
export class DetallePrestamoEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: number;

  @Column()
  libro: ObjectId;

  @Column()
  prestamo: ObjectId;
}