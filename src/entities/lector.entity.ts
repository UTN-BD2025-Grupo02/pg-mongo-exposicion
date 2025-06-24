import { Column, Entity, ForeignKey, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


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


   @OneToMany(() => FavoritoslectorEntity, {nullable: true})
   @JoinColumn({name: "favoritosLector"})
   favoritosLector: FavoritoslectorEntity;




}
