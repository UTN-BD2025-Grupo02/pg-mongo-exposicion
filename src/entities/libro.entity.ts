import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoLibroEntity } from './estadoLibro.entity';
import { TipoLibroEntity } from './tipoLibro.entity';

@Entity('libro')
export class LibroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ type: 'varchar', length: 50 })
  autor: string;

  @Column({ type: 'varchar', length: 50 })
  editorial: string;

  @ManyToOne(() => EstadoLibroEntity, (estadoLibro) => estadoLibro.libros)
  @JoinColumn({name: 'estado'})
  estado: EstadoLibroEntity;

  @ManyToOne(() => TipoLibroEntity, (tipoLibro) => tipoLibro.libros)
  @JoinColumn({name: 'tipoLibro'})
  tipoLibro: TipoLibroEntity;


}