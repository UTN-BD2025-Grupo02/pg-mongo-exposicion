import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Lector } from './Lector';
import { TipoLibroEntity } from './tipolibro.entity';

@Entity({ name: 'favoritoLector' })
export class FavoritosLector {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lector, lector => lector.favoritos)
  idLector: Lector;

  @ManyToOne(() => TipoLibroEntity, tipoLibro => tipoLibro.favoritos)
  idTipoLibro: TipoLibroEntity;

}
