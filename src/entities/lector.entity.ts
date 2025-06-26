import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrestamoEntity } from "./prestamo.entity";
import { CiudadEntity } from "./ciudad.entity";
import { FavoritosLectorEntity } from "./favoritoLector.entity";

@Entity('lector')
export class LectorEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;


   @Column({type: 'varchar', length: 50 })
   nombre: string;


   @Column({type: 'varchar', length: 50 })
   apellido: string;


   @OneToMany(()=> PrestamoEntity, (prestamo) => prestamo.lector)
   prestamos: PrestamoEntity[];


   @OneToMany(()=> CiudadEntity, (ciudad) => ciudad.lector)
   @JoinColumn({name: "ciudadId"})
   ciudadId: CiudadEntity;


   @OneToMany(() => FavoritosLectorEntity, (favoritosLector) => favoritosLector.idLector)
   favoritosLector: FavoritosLectorEntity[];




}
