import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { LectorEntity } from './lector.entity';
import { TipoLibroEntity } from './tipoLibro.entity';


@Entity({ name: 'favoritoLector' })
export class FavoritosLectorEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LectorEntity, lector => lector.favoritosLector)
  @JoinColumn({ name: 'idLector' })
  idLector: LectorEntity;

  @ManyToOne(() => TipoLibroEntity, tipoLibro => tipoLibro.favoritos)
  @JoinColumn({ name: 'idTipoLibro' })
  idTipoLibro: TipoLibroEntity;

}
