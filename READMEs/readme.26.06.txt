26/06

Aclaración: Para referenciar comandos utilice las comillas dobles "".

Para correr el proyecto:
	1. Posicionarse en el directorio raíz
	2. Docker compose up --build (Levanta Postgres,Mongo y la App NestJS)
	3. Para visualizar la db de Mongo tienen dos formas :
		- Por CMD 
			+ docker compose exec -it mongodb sh
			+ Dentro del contenedor ejecutar "mongosh"
			+ use mi-biblioteca
			+ prueben de hacer un insert ya que no se crearan automáticamente las tablas si es que no existe ningún dato dentro 			de ellas. "db.tipoLibros.insertOne({
  					nombre: "Ficción",
  					descripcion: "Libros de ficción"})"
									
			+ Luego para ver la tabla  "show collections"
			+ Para ver el dato ingresdo "db.tipoLibros.find().pretty()"
		
		- Por Mongo Compass (Interfaz)
			+ Buscan compass mongo y lo descargan
			+ "Add new conecction" deberían de poder ingresr con esta dirección "mongodb://localhost:27017/mi-biblioteca"

Implementaciones:
	+ App Module conecta a postgres y a mongo utilizando las credenciales indicadas en docker compose.
	+ Se creo la carpeta "entitiesMongo" donde se guardan las entidades con las etiquetas para mapear a la db de Mongo.
	+ El archivo que hace de puente entre las entidades y la db es Mongo.Module.ts

 