import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Lector } from './Lector';
import { TipoLibroEntity } from './tipoLibro.entity';

@Entity({ name: 'favoritoLector' })
export class FavoritosLectorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lector, lector => lector.favoritos)
  lector: Lector;

  @ManyToOne(() => TipoLibroEntity, tipoLibro => tipoLibro.favoritos)
  tipoLibro: TipoLibroEntity;

}
