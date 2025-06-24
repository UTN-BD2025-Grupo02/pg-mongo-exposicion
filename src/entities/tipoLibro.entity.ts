import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LibroEntity } from './libro.entity';
import { FavoritosLectorEntity } from './favoritoLector.entity';

@Entity('tipoLibro')
export class TipoLibroEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'text', length: 50, nullable: true })
  descripcion: string;

  @OneToMany(() => LibroEntity, libro => libro.tipoLibro)
  libros: LibroEntity[];

  @OneToMany(() => FavoritosLectorEntity, fav => fav.tipoLibro)
  favoritos: FavoritosLectorEntity[];
  
}
