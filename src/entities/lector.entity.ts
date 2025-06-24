import { Column, Entity, ForeignKey, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrestamoEntity } from "./prestamo.entity";
import { CiudadEntity } from "./ciudad.entity";
import { FavoritosLectorEntity } from "./favoritoLector.entity";

@Entity('lector')
export class LectorEntity {
   @PrimaryGeneratedColumn()
   id: number;


   @Column({type: 'varchar', length: 50 })
   nombre: string;


   @Column({type: 'varchar', length: 50 })
   apellido: string;


   @OneToMany(()=> PrestamoEntity)
   @JoinColumn({name: "prestamos"})
   prestamos: PrestamoEntity;


   @OneToOne(()=> CiudadEntity)
   @JoinColumn({name: "ciudadId"})
   ciudadId: CiudadEntity;


   @OneToMany(() => FavoritosLectorEntity, {nullable: true})
   @JoinColumn({name: "favoritosLector"})
   favoritosLector: FavoritosLectorEntity;




}
