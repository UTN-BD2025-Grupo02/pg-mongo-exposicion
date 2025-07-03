Perfecto, Agustín. A continuación te dejo una versión estructurada de tu contenido en formato de **README tipo tutorial**, ideal para un repositorio en GitHub o entrega académica. Se presenta como una guía paso a paso para implementar la base de datos en PostgreSQL y MongoDB usando NestJS.

---

# 📚 Tutorial de Implementación de Bases de Datos Relacional y No Relacional con NestJS

**Materia:** Bases de Datos
**Carrera:** Ingeniería en Sistemas
**Universidad Tecnológica Nacional - Facultad Regional Villa María
Grupo 02 - Bases de Datos**

---

## 🧾 Resumen

Este tutorial tiene como objetivo guiar al usuario en la implementación de un sistema backend utilizando **NestJS**, con soporte para dos tipos de base de datos:

* **PostgreSQL** (relacional)
* **MongoDB** (no relacional)

El caso práctico se basa en la gestión de una **biblioteca**, que debe registrar información sobre lectores, libros y préstamos, adaptando el diseño tanto para una base relacional como para una documental.

---

## 🛠 Tecnologías Utilizadas

* NestJS
* PostgreSQL
* MongoDB
* TypeORM
* Docker
* AdminJS

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
├── docker-compose.yml
├── package.json
└── README.md
```

---

## 🔌 Configuración de Conexiones

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

## 🧱 Entidades

### MongoDB

Ejemplo: `CiudadEntity`

```ts
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

---

### PostgreSQL

Ejemplo: `PrestamoEntity`

```ts
@Entity('prestamo')
export class PrestamoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaPrestamo: Date;

  @ManyToOne(() => LectorEntity, (lector) => lector.prestamos)
  lector: LectorEntity;

  @ManyToOne(() => EstadoPrestamoEntity, (estado) => estado.prestamos)
  estado: EstadoPrestamoEntity;
}
```

---

## 🌱 Seeds (Datos de prueba)

### MongoDB

```ts
export async function seedCiudades() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(CiudadEntity);
  const ciudades = [
    { nombre: "Buenos Aires", nroHabitante: 3000000 },
    { nombre: "Córdoba", nroHabitante: 1500000 },
  ];
  for (const c of ciudades) {
    await repo.save(repo.create(c));
  }
}
```

### PostgreSQL

```ts
export async function seedPrestamos() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(PrestamoEntity);
  const prestamos = [
    {
      fechaPrestamo: new Date("2024-01-15"),
      lector: juan,
      estado: devuelto,
    },
  ];
  for (const p of prestamos) {
    await repo.save(repo.create(p));
  }
}
```

---

## 📦 Service y Controller

### Service MongoDB

```ts
@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(PrestamoEntity)
    private readonly prestamoRepo: MongoRepository<PrestamoEntity>,
  ) {}

  async findAll(): Promise<any[]> {
    const prestamos = await this.prestamoRepo.find();
    // Enriquecer con lectores y estados
    return prestamos;
  }
}
```

### Controller

```ts
@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly service: PrestamosService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.service.findAll();
  }
}
```

---

## ⚙️ AdminJS

Se puede utilizar para administrar gráficamente las entidades:

```ts
dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
  AdminModule.createAdminAsync({
    useFactory: async () => {
      const AdminJS = (await dynamicImport('adminjs')).default;
      return {
        adminJsOptions: {
          rootPath: '/admin',
          resources: [...entities],
        },
      };
    },
  }),
);
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

## 🧪 Pruebas

1. Levantar la base de datos con Docker (`docker-compose up`)
2. Ejecutar los seeds con `ts-node src/seeds/seedPrestamos.ts`
3. Correr el servidor NestJS con `npm run start:dev`
4. Acceder a `/admin` para visualizar con AdminJS

---

## 🧑‍💻 Autores

* @AgusLiendo
* @EliasDalmasso
* @MaschioPablo
* @Balti2003
* @ManuelVeronese
* @Ignaciofumero

---

¿Querés que te genere también el `docker-compose.yml` para MongoDB y PostgreSQL juntos?
