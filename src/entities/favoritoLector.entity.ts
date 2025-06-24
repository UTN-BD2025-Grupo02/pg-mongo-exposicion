import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { LectorEntity } from './lector.entity';
import { TipoLibroEntity } from './tipoLibro.entity';

@Entity({ name: 'favoritoLector' })
export class FavoritosLectorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LectorEntity, lector => lector.favoritosLector)
  idLector: LectorEntity;

  @ManyToOne(() => TipoLibroEntity, tipoLibro => tipoLibro.favoritos)
  idTipoLibro: TipoLibroEntity;

}
