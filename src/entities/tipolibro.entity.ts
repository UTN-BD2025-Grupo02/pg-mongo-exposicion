import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tipo_libro' })
export class TipoLibro {
  
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
