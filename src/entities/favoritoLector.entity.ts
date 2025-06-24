import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Lector } from './Lector';
import { TipoLibro } from './TipoLibro';

@Entity()
export class FavoritosLector {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lector, lector => lector.favoritos)
  idLector: Lector;

  @ManyToOne(() => TipoLibro, tipoLibro => tipoLibro.favoritos)
  idTipoLibro: TipoLibro;

}
