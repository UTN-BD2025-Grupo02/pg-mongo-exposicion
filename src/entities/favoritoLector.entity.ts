import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';



@Entity({ name: 'favorito_lector' })
export class FavoritosLectorEntity extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectId;
  // @ts-ignore
  @Column({type: 'objectId'})
  idLector: ObjectId;
  // @ts-ignore
  @Column({type: 'objectId'})
  idTipoLibro: ObjectId;

}
