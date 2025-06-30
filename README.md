# **ORM Biblioteca**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Apache Superset](https://img.shields.io/badge/Apache_Superset-FF5733?style=for-the-badge&logo=apache-superset&logoColor=white)
![pgAdmin](https://img.shields.io/badge/pgAdmin-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## **Biblioteca**

Este repositorio contiene los archivos para ejecutar un Repositorio docker con PostgreSQL, pgAdmin y Superset. El proyecto contiene datos de la Distribución geográfica de los establecimientos productivos. Esta información será cargada automaticamente a la base de datos durante su primera ejecución.
La información fue obtenida de: [Datos Argentina](https://datos.gob.ar)

## **Descarga de Datasets**

Los datasets utilizados en este proyecto pueden descargarse desde el portal oficial de datos abiertos del gobierno de Argentina:  
[https://datos.gob.ar/dataset](https://datos.gob.ar/dataset)

Este portal proporciona información pública en formatos reutilizables, incluyendo datos relacionados con la Distribución geográfica de los establecimientos productivos en Argentina.

## **Resumen del Tutorial**

Este tutorial guía al usuario a través de los pasos necesarios para desplegar una infraestructura ETL utilizando Docker, PostgreSQL, Apache Superset y pgAdmin. Se incluyen instrucciones detalladas para:

1. Levantar los servicios con Docker.
2. Configurar la conexión a la base de datos en Apache Superset.
3. Ejecutar consultas SQL para analizar los datos de establecimientos.
4. Crear gráficos y tableros interactivos para la visualización de datos.

## **Palabras Clave**

- Docker
- PostgreSQL
- Apache Superset
- pgAdmin
- ETL
- Visualización de Datos

## **Mantenido Por**

Grupo 02 - bases de Datos

## **Descargo de Responsabilidad**

El código proporcionado se ofrece "tal cual", sin garantía de ningún tipo, expresa o implícita. En ningún caso los autores o titulares de derechos de autor serán responsables de cualquier reclamo, daño u otra responsabilidad.

## **Descripción del Proyecto**

Este proyecto implementa un proceso ETL (Extract, Transform, Load) para la carga y análisis de datos relacionados con la Distribución geográfica de los establecimientos productivos en Argentina. Utiliza herramientas modernas como Docker, PostgreSQL, Apache Superset y pgAdmin para facilitar la gestión, análisis y visualización de datos.

El objetivo principal es proporcionar una solución escalable y reproducible para analizar datos de distribución geográfica de los establecimientos productivos por grupo departamento, provincia y tipo de actividad, permitiendo la creación de tableros interactivos y gráficos personalizados.

## **Diagrama E-R**
![image](https://github.com/user-attachments/assets/fa72e172-f5b7-447a-aeca-4ae13b6b61ec)

## Diagrama de relaciones entre tablas
Referencia:
* Una provincia tiene muchos departamentos → relación 1:N
* Una provincia tiene muchos establecimientos → relación 1:N
* Un establecimiento tiene muchas actividades → relación 1:N

Significado:
* 1 → un único registro en la tabla padre (ej. una provincia)
* N → muchos registros relacionados en la tabla hija (ej. varios departamentos en esa provincia)

## Diagrama de relaciones entre tablas (completo con atributos y relaciones)



### **Entidades y Atributos**

1. **distribucion establecimientos**  
   - **Atributos:**  
     - `cuit`: Identificador único del registro
     - `sucursal`: Indicador único por sucursal de cada cuit
     - `anio`: Año al que refiere la información del establecimiento en cuestión
     - `lat`: Coordenadas geográficas
     - `lon`: Coordenadas geográficas  
     - `clae6`: Sector de actividad a seis dígitos en base al Clasificador Nacional de Actividades Económicas (CLAE)
     - `clae2`: Sector de actividad a dos dígitos en base al Clasificador Nacional de Actividades Económicas (CLAE)
     - `in_departamentos`: Código de departamento del Instituto Geográfico Nacional
     - `provincia_id`: Clave foránea que referencia a la provincia a la que pertenece el establecimiento.
     - `quintil`: Quintil de exportaciones de bienes en el que se ubica la empresa según el nivel de exportaciones del año en cuestión
     - `empleo`: Promedio de trabajadores 
     - `proporcion_mujeres`: Indica la cantidad de mujeres que trabajaron en el período analizado en esa sucursal sobre la totalidad de empleados

2. **departamento**  
   - **Atributos:**  
     - `id`: Identificador único del departamento.  
     - `nombre`: Nombre del departamento.  
     - `provincia_id`: Clave foránea que referencia a la provincia a la que pertenece el departamento.  

3. **provincia**  
   - **Atributos:**  
     - `id`: Identificador único de la provincia.  
     - `nombre`: Nombre de la provincia.  
     - `nombre_completo`: Nombre completo de la provincia.  
     - `centroide_lat`: Latitud del centroide de la provincia.  
     - `centroide_lon`: Longitud del centroide de la provincia.  
     - `categoria`: Categoría administrativa de la provincia.
     - `iso_id`: Id que le brinda la ISO
     - `iso_nombre`: Nombre que le brinda la ISO
    
3. **actividades establecimientos**  
   - **Atributos:**  
     - `clae6`: Sector de actividad a seis dígitos en base al Clasificador Nacional de Actividades Económicas (CLAE)  
     - `clae2`: Sector de actividad a dos dígitos en base al Clasificador Nacional de Actividades Económicas (CLAE)  
     - `clae6_desc`: Descripcion del sector de actividades  
     - `clae2_desc`: Descripcion del sector de actividades
     - `letra`: Sector de actividad a nivel de letra en base al Clasificador Nacional de Actividades Económicas (CLAE) 

## Descripcion del modelo

El modelo de datos está compuesto por 4 entidades principales: `provincia`, `departamento`, `distribucion_establecimientos` y `actividades_establecimiento`. Estas entidades están relacionadas para representar la estructura jerárquica de los datos geográficos y epidemiológicos.


## **Características Principales**

- **Infraestructura Contenerizada:** Uso de Docker para simplificar la configuración y despliegue.
- **Base de Datos Relacional:** PostgreSQL para almacenar y gestionar los datos.
- **Visualización de Datos:** Apache Superset para crear gráficos y tableros interactivos.
- **Gestión de Base de Datos:** pgAdmin para administrar y consultar la base de datos.

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Navegador web para acceder a Apache Superset y pgAdmin.

## **Servicios Definidos en Docker Compose**

El archivo `docker-compose.yml` define los siguientes servicios:

1. **Base de Datos (PostgreSQL):**
   - Imagen: `postgres:alpine`
   - Puertos: `5432:5432`
   - Volúmenes:
     - `postgres-db:/var/lib/postgresql/data` (almacenamiento persistente de datos)
     - `./scripts:/docker-entrypoint-initdb.d` (scripts de inicialización)
     - `./datos:/datos` (directorio para datos adicionales)
   - Variables de entorno:
     - Configuradas en el archivo `.env.db`
   - Healthcheck: 
     - Comando: `pg_isready`
     - Intervalo: 10 segundos
     - Retries: 5

2. **Apache Superset:**
   - Imagen: `apache/superset:4.0.0`
   - Puertos: `8088:8088`
   - Dependencias:
     - Depende del servicio `db` y espera a que esté saludable.
   - Variables de entorno:
     - Configuradas en el archivo `.env.db`

3. **pgAdmin:**
   - Imagen: `dpage/pgadmin4`
   - Puertos: `5050:80`
   - Dependencias:
     - Depende del servicio `db` y espera a que esté saludable.
   - Variables de entorno:
     - Configuradas en el archivo `.env.db`

## **Instrucciones de Configuración**

1. **Clonar el repositorio:**
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd postgres-etl
   ```

2. **Configurar el archivo `.env.db`:**
   Crea un archivo `.env.db` en la raíz del proyecto con las siguientes variables de entorno:
   ```env
   # Usuario Root
   POSTGRES_PASSWORD=postgres
   PGUSER=postgres

   # Usuario pgAdmin
   PGADMIN_EMAIL=admin@ejemplo.com
   PGADMIN_PASSWORD=admin123
   
   # Superset
   SUPERSET_SECRET_KEY=123456789
   ```
  
3. **Levantar los servicios:**
   Ejecuta los siguientes comandos para iniciar los contenedores:

   ```bash
     docker-compose up -d
     docker exec -it superset_etl bash -C "/script.sh"
   ```
   
4. **Acceso a las herramientas:**
   - **Apache Superset:** [http://localhost:8088/](http://localhost:8088/)  
     Credenciales predeterminadas: ***`admin/admin`***
   - **pgAdmin:** [http://localhost:5050/](http://localhost:5050/)  
     Configura la conexión a PostgreSQL utilizando las credenciales definidas en el archivo `.env.db`.

## **Uso del Proyecto**

### **1. Configuración de la Base de Datos**

Accede a Apache Superset y crea una conexión a la base de datos PostgreSQL en la sección ***`Settings`***. Asegúrate de que la conexión sea exitosa antes de proceder.

### **2. Consultas SQL**

#### **Consulta 1: Consultar tipo de actividades según departamento**
```
   SELECT provincia.nombre AS nombre_provincia, departamento.nombre AS nombre_departamento, clae6_desc
   FROM public.distribucion_establecimientos
   
   INNER JOIN public.departamento
   ON departamento.id = distribucion_establecimientos.in_departamentos
   
   INNER JOIN public.provincia 
   ON provincia.id = distribucion_establecimientos.provincia_id
   
   INNER JOIN public.actividades_establecimientos
   ON distribucion_establecimientos.clae6 = actividades_establecimientos.clae6;
```
#### **Consulta 2: Consultar proporcion de género por actividad productiva**
```
   SELECT 
  clae6_desc,
  'Mujeres' AS genero,
  ROUND(proporcion_mujeres * 100) AS porcentaje
FROM public.distribucion_establecimientos
INNER JOIN public.actividades_establecimientos
  ON actividades_establecimientos.clae6 = distribucion_establecimientos.clae6

UNION ALL

SELECT 
  clae6_desc,
  'Hombres' AS genero,
  ROUND((1 - proporcion_mujeres) * 100) AS porcentaje
FROM public.distribucion_establecimientos
INNER JOIN public.actividades_establecimientos
  ON actividades_establecimientos.clae6 = distribucion_establecimientos.clae6;

```
#### **Consulta 3: Consultar rango de puestos de empleo por actividad productiva generalizada (CLAE2)**
```
   SELECT clae2_desc,empleo, clae6_desc
   FROM public.distribucion_establecimientos
   INNER JOIN public.actividades_establecimientos
   ON actividades_establecimientos.clae6 = distribucion_establecimientos.clae6;
```
#### **Consulta 4: Consultar ubicación de los establecimientos**
```
SELECT provincia.nombre AS nombre_provincia, departamento.nombre AS nombre_departamento , lon , lat, clae6_desc
FROM public.distribucion_establecimientos
INNER JOIN public.provincia
ON distribucion_establecimientos.provincia_id = provincia.id

INNER JOIN public.actividades_establecimientos
ON distribucion_establecimientos.clae6 = actividades_establecimientos.clae6

INNER JOIN public.departamento 
ON distribucion_establecimientos.in_departamentos = departamento.id; 

```

### **3. Creación de Gráficos y Tableros**

1. Ejecuta las consultas en ***`SQL Lab`*** de Apache Superset.
2. Haz clic en el botón ***`CREATE CHART`*** para crear gráficos interactivos.
3. Configura el tipo de gráfico y las dimensiones necesarias.
4. Guarda el gráfico en un tablero con el botón ***`SAVE`***.

Se recomiendan los siguientes graficos:
- tipo de actividades según departamento -> `Grap Chart`
- rango de puestos de empleo por actividad productiva -> `Bar Chart`
- proporcion de mujeres por actividad productiva -> `Pie Chart`
- ubicación de los establecimientos -> `decl.gl Scatterplot`














