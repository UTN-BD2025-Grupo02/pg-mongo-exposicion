import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tipo_libro' }) // nombre de la tabla en la base de datos
export class TipoLibro {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'text', length: 50, nullable: true })
  descripcion: string;
}
