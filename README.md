# **Implementación de un proyecto en NestJS para una base de datos en PostgreSQL y MongoDB**

Práctico de Implementación de base de datos Relacional y No Relacional para la materia Bases de Datos, en la carrera Ingeniería en Sistemas de la Universidad Tecnológica Nacional Facultad Regional Villa María.

## **Mantenido Por**

Grupo 02 - Bases de Datos

## **Resumen del Tutorial**

Este tutorial guía al usuario a través de los pasos necesarios para implementar la creación e inserción de datos en una base de datos relacional en PostgreSQL y en una base de datos documental en MongoDB. Se incluyen instrucciones detalladas para:

- Crear las entidades para cada base de datos.
- Configuración de conexiones.
- Inserción de datos iniciales para pruebas.

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


## 📦 Estructura del proyecto (simplificada)

  ```
insertar la estructura del proyecto
  ```
# MongoDB
## Entidades

Creamos las entidades que necesitamos, como por ejemplo la entidad “Ciudad”
```

//Crear la entidad ciudad 
import { Entity, BaseEntity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';


@Entity('ciudad')
export class CiudadEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  nombre: string;

  @Column('number')
  nroHabitante: number;
}

```
## Seeds

### DataSource

Primer creamos el dataSource, el cual permite conectarnos e interactuar con la base de datos 

```
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
  entities: [...entities],
  synchronize: false,
  ssl: MONGO.MONGO_SSL
})
```

### Seeds

Creamos las seeds, los cuales tienen los datos. Por ejemplo, ciudad
```
import { CiudadEntity } from "../entities/ciudad.entity"
import { dataSource } from "./config/dataSoruce"

export async function seedCiudades() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos MongoDB")

    const ciudadRepository = dataSource.getRepository(CiudadEntity)

    // Verificar si ya existen datos
    const existingCiudades = await ciudadRepository.count()
    if (existingCiudades > 0) {
      console.log("Las ciudades ya están sembradas")
      return
    }

    const ciudades = [
      { nombre: "Buenos Aires", nroHabitante: 3000000 },
      { nombre: "Córdoba", nroHabitante: 1500000 },
      { nombre: "Rosario", nroHabitante: 1200000 },
      { nombre: "Mendoza", nroHabitante: 115000 },
      { nombre: "La Plata", nroHabitante: 700000 },
    ]

    for (const ciudadData of ciudades) {
      const ciudad = ciudadRepository.create(ciudadData)
      await ciudadRepository.save(ciudad)
    }

    console.log("✅ Ciudades sembradas exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando ciudades:", error)
  } finally {
    await dataSource.destroy()
  }
}
```

## Controller, module y service (NestJS)

### Controller

En el controller colocamos los endpoints que usaremos para obtener, actualizar y eliminar objetos de la base de datos

### Service

 Service aloja la logica de cada endpoint

### Module

En Module colocamos aquellos servicios, importaciones y proveedores que usara la app, como es el TypeORM y el AdminJS

```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dynamicImport } from './utils/dynamic-import';
import { entities } from './entities';




@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGO_HOST'),
        port: +configService.get('MONGO_PORT'),
        username: configService.get('MONGO_USERNAME'),
        password: configService.get('MONGO_PASSWORD'),
        database: configService.get('MONGO_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        useUnifiedTopology: true,
        ssl: configService.get('DB_SSL')
      }),
    }),
    dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const AdminJS = (await dynamicImport('adminjs')).default;
          const { Database, Resource } = await dynamicImport('@adminjs/typeorm');
          AdminJS.registerAdapter({ Database, Resource });
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [...entities],
            },
          };
        },
      }),
    ) as any,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```














