import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipoLibro')
export class TipoLibroEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'text', length: 50, nullable: true })
  descripcion: string;

  @OneToMany(() => Libro, libro => libro.tipoLibro)
  libros: Libro[];

  @OneToMany(() => FavoritosLector, fav => fav.tipoLibro)
  favoritos: FavoritosLector[];
  
}
