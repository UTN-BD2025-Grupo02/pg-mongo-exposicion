import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('prestamo')
export class PrestamoEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('date')
  fechaPrestamo: Date;

  @Column('date')
  fechaDevolucion: Date;

  @Column({type: 'date', nullable: true })
  fechaDevolucionReal: Date|null;
  // @ts-ignore
  @Column({type: 'objectId'})
  lector: ObjectId;
  // @ts-ignore
  @Column({type: 'objectId'})
  estado: ObjectId;
}
