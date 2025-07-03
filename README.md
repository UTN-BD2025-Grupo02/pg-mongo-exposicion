# **Implementación de un proyecto en NestJS para una base de datos en PostgreSQL y MongoDB**

Práctico de Implementación de base de datos Relacional y No Relacional para la materia Bases de Datos, en la carrera Ingeniería en Sistemas de la Universidad Tecnológica Nacional Facultad Regional Villa María.

## **Mantenido Por**

Grupo 02 - Bases de Datos

## 🛠 Tecnologías utilizadas
- NestJS
- PostgreSQL
- MongoDB
- TypeORM
- Docker
- Adminjs

## **Ejercicio Biblioteca**

Una biblioteca necesita disponer de una base de datos para llevar la gestión de sus préstamos. La base de datos deberá almacenar los siguientes datos sobre los lectores: un identificador de lector, su nombre, ciudad en la
que vive, tipo de libros que le gustan leer y el número de habitantes de su ciudad (para elaborar posibles estadísticas). Por su parte, sobre los libros de la biblioteca se debe registrar el código del libro, título, tipo de libro
(drama, comedia, terror, romántico, aventuras, biografía, etc.); y lo más importante, la biblioteca debe conocer en todo momento qué libro está prestado y a quién, así como la fecha de realización y devolución del préstamo.

## **Diagrama Entidad Relación**

![image](https://github.com/user-attachments/assets/72322608-abbb-4426-b991-9a951f4c45c2)

# Diferencias

En cuanto a la diferencia mas radical a MongoDB, se encuentra en el typeORM, es decir, donde estan las relaciones.

## Ejemplo: Prestamo


### Entity Postgres

```
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, OneToMany, BaseEntity,
} from 'typeorm';
import { LectorEntity } from './lector.entity';
import { EstadoPrestamoEntity } from './estadoPrestamo.entity';
import { DetallePrestamoEntity } from './detallePrestamo.entity';

@Entity('prestamo')
export class PrestamoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaPrestamo: Date;

  @Column({ type: 'date' })
  fechaDevolucion: Date;

  @Column({ type: 'date', nullable: true })
  fechaDevolucionReal: Date|null;

  @OneToMany(() => DetallePrestamoEntity, (detallePrestamo) => detallePrestamo.prestamo, { cascade: true })
  @JoinColumn({ name: 'detalle' })
  detalles: DetallePrestamoEntity[];

  @ManyToOne(() => LectorEntity, (lector) => lector.prestamos, { nullable: false })
  @JoinColumn({ name: 'lector' })
  lector: LectorEntity;

  @ManyToOne(() => EstadoPrestamoEntity, (estadoPrestamo) => estadoPrestamo.prestamos, { nullable: false })
  @JoinColumn({ name: 'estado' })
  estado: EstadoPrestamoEntity;
}
}
```

## Entity Mongo
```
import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('prestamo')
export class PrestamoEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('date')
  fechaPrestamo: Date;

  @Column('date')
  fechaDevolucion: Date;

  @Column({type: 'date', nullable: true })
  fechaDevolucionReal: Date|null;
  // @ts-ignore
  @Column({type: 'objectId'})
  lector: ObjectId;
  // @ts-ignore
  @Column({type: 'objectId'})
  estado: ObjectId;
}
```

Las relaciones se ven en el service, donde se implementa la logica para encontrar un objeto de json. Ademas, tambien las podemos ver en los seeds

## Seeds Postgres

```
import { PrestamoEntity } from "../entities/prestamo.entity"
import { LectorEntity } from "../entities/lector.entity"
import { EstadoPrestamoEntity } from "../entities/estadoPrestamo.entity"
import { dataSource } from './config/dataSource';

export async function seedPrestamos() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const prestamoRepository = dataSource.getRepository(PrestamoEntity)
    const lectorRepository = dataSource.getRepository(LectorEntity)
    const estadoPrestamoRepository = dataSource.getRepository(EstadoPrestamoEntity)

    // Verificar si ya existen datos
    const existingPrestamos = await prestamoRepository.count()
    if (existingPrestamos > 0) {
      console.log("Los préstamos ya están sembrados")
      return
    }

    // Obtener lectores y estados
    const juan = await lectorRepository.findOne({ where: { nombre: "Juan", apellido: "Pérez" } })
    const maria = await lectorRepository.findOne({ where: { nombre: "María", apellido: "González" } })
    const carlos = await lectorRepository.findOne({ where: { nombre: "Carlos", apellido: "López" } })
    const ana = await lectorRepository.findOne({ where: { nombre: "Ana", apellido: "Martínez" } })

    const activo = await estadoPrestamoRepository.findOne({ where: { valor: "Activo" } })
    const devuelto = await estadoPrestamoRepository.findOne({ where: { valor: "Devuelto" } })
    const vencido = await estadoPrestamoRepository.findOne({ where: { valor: "Vencido" } })

    if (!juan || !maria || !carlos || !ana || !activo || !devuelto || !vencido) {
      console.log("❌ No se encontraron todos los lectores o estados. Ejecuta primero esos seeds.")
      return
    }

    const prestamos = [
      {
        fechaPrestamo: new Date("2024-01-15"),
        fechaDevolucion: new Date("2024-01-29"),
        fechaDevolucionReal: new Date("2024-01-28"),
        lector: juan,
        estado: devuelto,
      },
      {
        fechaPrestamo: new Date("2024-02-01"),
        fechaDevolucion: new Date("2024-02-15"),
        fechaDevolucionReal: null,
        lector: maria,
        estado: activo,
      },
      {
        fechaPrestamo: new Date("2024-01-20"),
        fechaDevolucion: new Date("2024-02-03"),
        fechaDevolucionReal: null,
        lector: carlos,
        estado: vencido,
      },
      {
        fechaPrestamo: new Date("2024-02-10"),
        fechaDevolucion: new Date("2024-02-24"),
        fechaDevolucionReal: new Date("2024-02-22"),
        lector: ana,
        estado: devuelto,
      },
      {
        fechaPrestamo: new Date("2024-02-15"),
        fechaDevolucion: new Date("2024-03-01"),
        fechaDevolucionReal: null,
        lector: juan,
        estado: activo,
      },
    ]

    for (const prestamoData of prestamos) {
      const prestamo = prestamoRepository.create(prestamoData)
      await prestamoRepository.save(prestamo)
    }

    console.log("✅ Préstamos sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando préstamos:", error)
  } finally {
    await dataSource.destroy()
  }
}
```

## Seeds Mongo

```
import { PrestamoEntity } from "../entities/prestamo.entity"
import { LectorEntity } from "../entities/lector.entity"
import { EstadoPrestamoEntity } from "../entities/estadoPrestamo.entity"
import { dataSource } from "./config/dataSource"

export async function seedPrestamos() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos MongoDB")

    const prestamoRepository = dataSource.getRepository(PrestamoEntity)
    const lectorRepository = dataSource.getRepository(LectorEntity)
    const estadoPrestamoRepository = dataSource.getRepository(EstadoPrestamoEntity)

    // Verificar si ya existen datos
    const existingPrestamos = await prestamoRepository.count()
    if (existingPrestamos > 0) {
      console.log("Los préstamos ya están sembrados")
      return
    }

    // Obtener lectores y estados
    const juan = await lectorRepository.findOne({ where: { nombre: "Juan", apellido: "Pérez" } })
    const maria = await lectorRepository.findOne({ where: { nombre: "María", apellido: "González" } })
    const carlos = await lectorRepository.findOne({ where: { nombre: "Carlos", apellido: "López" } })
    const ana = await lectorRepository.findOne({ where: { nombre: "Ana", apellido: "Martínez" } })

    const activo = await estadoPrestamoRepository.findOne({ where: { valor: "Activo" } })
    const devuelto = await estadoPrestamoRepository.findOne({ where: { valor: "Devuelto" } })
    const vencido = await estadoPrestamoRepository.findOne({ where: { valor: "Vencido" } })

    if (!juan || !maria || !carlos || !ana || !activo || !devuelto || !vencido) {
      console.log("❌ No se encontraron todos los lectores o estados. Ejecuta primero esos seeds.")
      return
    }

    const prestamos = [
      {
        fechaPrestamo: new Date("2024-01-15"),
        fechaDevolucion: new Date("2024-01-29"),
        fechaDevolucionReal: new Date("2024-01-28"),
        lector: juan._id,
        estado: devuelto._id,
      },
      {
        fechaPrestamo: new Date("2024-02-01"),
        fechaDevolucion: new Date("2024-02-15"),
        fechaDevolucionReal: null,
        lector: maria._id,
        estado: activo._id,
      },
      {
        fechaPrestamo: new Date("2024-01-20"),
        fechaDevolucion: new Date("2024-02-03"),
        fechaDevolucionReal: null,
        lector: carlos._id,
        estado: vencido._id,
      },
      {
        fechaPrestamo: new Date("2024-02-10"),
        fechaDevolucion: new Date("2024-02-24"),
        fechaDevolucionReal: new Date("2024-02-22"),
        lector: ana._id,
        estado: devuelto._id,
      },
      {
        fechaPrestamo: new Date("2024-02-15"),
        fechaDevolucion: new Date("2024-03-01"),
        fechaDevolucionReal: null,
        lector: juan._id,
        estado: activo._id,
      },
    ]

    for (const prestamoData of prestamos) {
      const prestamo = prestamoRepository.create(prestamoData)
      await prestamoRepository.save(prestamo)
    }

    console.log("✅ Préstamos sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando préstamos:", error)
  } finally {
    await dataSource.destroy()
  }
}
```

## Services Postgres

```
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PrestamoEntity } from '../entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PrestamosService {
  private prestamoRepository: Repository<PrestamoEntity>;

  constructor(
    @InjectRepository(PrestamoEntity)
    prestamoRepository: Repository<PrestamoEntity>,

  ) {
    this.prestamoRepository = prestamoRepository;
  }

  async findAll(): Promise<PrestamoEntity[]> {
    return this.prestamoRepository.find({relations: ['lector', 'estado']});
  }
}
```

## Services Mongo

```
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { PrestamoEntity } from '../entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPrestamoEntity } from '../entities/estadoPrestamo.entity';
import { LectorEntity } from '../entities/lector.entity';

@Injectable()
export class PrestamosService {
  private prestamoRepository: MongoRepository<PrestamoEntity>;
  private estadoRepository: MongoRepository<EstadoPrestamoEntity>;
  private lectorRepository: MongoRepository<LectorEntity>;

  constructor(
    @InjectRepository(PrestamoEntity)
    prestamoRepository: MongoRepository<PrestamoEntity>,

    @InjectRepository(EstadoPrestamoEntity)
    estadoRepository: MongoRepository<EstadoPrestamoEntity>,

    @InjectRepository(LectorEntity)
    lectorRepository: MongoRepository<LectorEntity>,
  ) {
    this.prestamoRepository = prestamoRepository;
    this.estadoRepository = estadoRepository;
    this.lectorRepository = lectorRepository;
  }

  async findAll(): Promise<any[]> {
    const prestamos = await this.prestamoRepository.find();

    const lectoresIds = prestamos.map((p) => p.lector);
    const estadosIds = prestamos.map((p) => p.estado);



    const lectores = await this.lectorRepository.find({
      where: { _id: {$in: lectoresIds} },
    });
    const estados = await this.estadoRepository.find({
      where: { _id: {$in: estadosIds} },
    });



    return prestamos.map((prestamo) => ({
      ...prestamo,
      lector: lectores.find((l) => l._id.equals(prestamo.lector)),
      estado: estados.find((e) => e._id.equals(prestamo.estado)),
    }));
  }
}
```









