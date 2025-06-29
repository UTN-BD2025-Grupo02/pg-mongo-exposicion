import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { LibroEntity } from './libro.entity';
import { FavoritosLectorEntity } from './favoritoLector.entity';

@Entity('tipo_libro')
export class TipoLibroEntity extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  descripcion: string;

  @OneToMany(() => LibroEntity, libro => libro.tipoLibro)
  libros: LibroEntity[];

  @OneToMany(() => FavoritosLectorEntity, fav => fav.idTipoLibro)
  favoritos: FavoritosLectorEntity[];
  
}
