import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('prestamo')
export class PrestamoEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  fechaPrestamo: Date;

  @Column()
  fechaDevolucion: Date;

  @Column({ nullable: true })
  fechaDevolucionReal: Date|null;

  @Column()
  lector: ObjectId;

  @Column()
  estado: ObjectId;
}
