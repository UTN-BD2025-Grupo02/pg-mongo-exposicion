import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Libro, LibroSchema } from './entities_mongo/libro.schema';
import { TipoLibro, TipoLibroSchema } from './entities_mongo/tipoLibro.schema';
import { EstadoLibro, EstadoLibroSchema } from './entities_mongo/estadoLibro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Libro.name, schema: LibroSchema },
      { name: TipoLibro.name, schema: TipoLibroSchema },
      { name: EstadoLibro.name, schema: EstadoLibroSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
