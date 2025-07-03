
---

# 📚 Tutorial de Implementación de Bases de Datos Relacional y No Relacional con NestJS

**Materia:** Bases de Datos

**Carrera:** Ingeniería en Sistemas

**Universidad Tecnológica Nacional - Facultad Regional Villa María Grupo 02 - Bases de Datos**

---

## 🧾 Resumen

Este tutorial tiene como objetivo guiar al usuario en la implementación de un sistema backend utilizando **NestJS**, con soporte para dos tipos de base de datos:

* **PostgreSQL** (relacional)
* **MongoDB** (no relacional)

El caso práctico se basa en la gestión de una **biblioteca**, que debe registrar información sobre lectores, libros y préstamos, adaptando el diseño tanto para una base relacional como para una documental.

---

## ✏️ Ejercicio Biblioteca

Una biblioteca necesita disponer de una base de datos para llevar la gestión de sus préstamos. La base de datos deberá almacenar los siguientes datos sobre los lectores: un identificador de lector, su nombre, ciudad en la
que vive, tipo de libros que le gustan leer y el número de habitantes de su ciudad (para elaborar posibles estadísticas). Por su parte, sobre los libros de la biblioteca se debe registrar el código del libro, título, tipo de libro
(drama, comedia, terror, romántico, aventuras, biografía, etc.); y lo más importante, la biblioteca debe conocer en todo momento qué libro está prestado y a quién, así como la fecha de realización y devolución del préstamo.

## 📄 Diagrama Entidad Relación

![image](https://github.com/user-attachments/assets/72322608-abbb-4426-b991-9a951f4c45c2)

## 🛠 Tecnologías Utilizadas

* NestJS
* PostgreSQL
* MongoDB
* TypeORM

---

## 📁 Estructura del Proyecto

```bash
├── src/
│   ├── entities/
│   ├── services/
│   ├── controllers/
│   ├── seeds/
│   └── config/
├── .env
├── package.json
└── README.md
```

---

## 🔌 Configuración de Conexiones

### PostgreSQL

1. Variables en `.env`:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=biblioteca
```

2. Configuración en `TypeOrmModule`:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: true,
}),
```


---

### MongoDB

1. Crear archivo `.env` con las siguientes variables:

```env
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USERNAME=root
MONGO_PASSWORD=example
MONGO_DATABASE=biblioteca
MONGO_SSL=false
```

2. Configuración del `DataSource`:

```ts
// src/seeds/config/dataSource.ts
import { DataSource } from 'typeorm';
import { MONGO } from './env';
import { entities } from '../../entities';

export const dataSource = new DataSource({
  type: "mongodb",
  host: MONGO.MONGO_HOST,
  port: MONGO.MONGO_PORT,
  username: MONGO.MONGO_USERNAME,
  password: MONGO.MONGO_PASSWORD,
  database: MONGO.MONGO_DATABASE,
  entities,
  synchronize: false,
  ssl: MONGO.MONGO_SSL,
});
```

---

## 🧱 Entidades

### PostgreSQL

Ejemplo: `PrestamoEntity`

```ts
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
```
---

### MongoDB

Ejemplo: `PrestamoEntity`

```ts
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

---

## 🌱 Seeds (Datos de prueba)

### PostgreSQL

```ts
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
      console.log("Los préstamos ya están creados")
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
      console.log("No se encontraron todos los lectores o estados")
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

    console.log("Préstamos creados exitosamente")
  } catch (error) {
    console.error("Error creando los préstamos:", error)
  } finally {
    await dataSource.destroy()
  }
}
```
---
### MongoDB

```ts
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
      console.log("Los préstamos ya están creados")
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
      console.log("No se encontraron todos los lectores o estados")
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

    console.log("Préstamos creados exitosamente")
  } catch (error) {
    console.error("Error creando los préstamos:", error)
  } finally {
    await dataSource.destroy()
  }
}
```
---

## ⚙️ Service

### Prestamo Services Postgres

```ts
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
---
### Prestamo Service MongoDB

```ts
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { PrestamoEntity } from '../entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PrestamosService {
  private prestamoRepository: MongoRepository<PrestamoEntity>;


  constructor(
    @InjectRepository(PrestamoEntity)
    prestamoRepository: MongoRepository<PrestamoEntity>,
  ) {
    this.prestamoRepository = prestamoRepository;
  }

  async findAll(): Promise<any[]> {
    return await this.prestamoRepository.aggregate([
      // Join con estado del préstamo
      {
        $lookup: {
          //coleccion a unir
          from: 'estado_prestamo',
          //campo en la entidad actual (Prestamo)
          localField: 'estado',
          //Campo en la entidad a unir (EstadoPrestamo)
          foreignField: '_id',
          //Nombre del campo en la entidad resultante
          as: 'estado'
        }
      },
      //Convierte el array en un objeto
      { $unwind: '$estado' },

      // Join con lector
      {
        $lookup: {
          from: 'lector',
          localField: 'lector',
          foreignField: '_id',
          as: 'lector'
        }
      },
      { $unwind: '$lector' },

      // Join con detalles del préstamo
      {
        $lookup: {
          from: 'detalle_prestamo',
          localField: '_id',
          foreignField: 'prestamo',
          as: 'detalles'
        }
      },

      // Dentro de cada detalle, hacer join con libro
      {
        $unwind: {
          path: '$detalles',
          //Para evitar eliminar detalles que no tengan libro
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'libro',
          localField: 'detalles.libro',
          foreignField: '_id',
          as: 'detalles.libro'
        }
      },
      {
        $unwind: {
          path: '$detalles.libro',
          preserveNullAndEmptyArrays: true
        }
      },

      // Reconstruir el array de prestamos para incorporar los detalles
      {
        $group: {
          _id: '$_id',
          fechaPrestamo: { $first: '$fechaPrestamo' },
          fechaDevolucion: { $first: '$fechaDevolucion' },
          fechaDevolucionReal: { $first: '$fechaDevolucionReal' },
          //$first mantiene los primeros elementos (incorporados previamente) de cada grupo
          lector: { $first: '$lector' },
          estado: { $first: '$estado' },
          //$push incorpora los elementos de cada grupo en un array
          detalles: { $push: '$detalles' }
        }
      }
    ]).toArray();
  }

}
```

---

## 🧠 Comparación entre MongoDB y PostgreSQL

| Característica          | MongoDB                        | PostgreSQL                          |
| ----------------------- | ------------------------------ | ----------------------------------- |
| Tipo de DB              | No relacional (documental)     | Relacional (SQL)                    |
| Relaciones              | Manuales (por ID, en service)  | Implícitas (con `@ManyToOne`, etc.) |
| Flexibilidad de esquema | Alta                           | Rígida                              |
| Seeds                   | Referencias por ObjectId       | Relaciones directas entre entidades |
| Consultas               | Agregadas en lógica (servicio) | Con `JOIN` directo en consulta      |

---

## 🧑‍💻 Autores

* Agustin Liendo Ortiz
* Elias Dalmasso
* Pablo Maschio
* Baltasar Lomello
* Manuel Veronese
* Ignacio Fumero
* Pedro Mansilla
* Francisco Belegni

---
