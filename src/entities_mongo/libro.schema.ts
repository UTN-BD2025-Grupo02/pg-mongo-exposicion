// src/libro/schemas/libro.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EstadoLibro } from './estadoLibro.schema';
import { TipoLibro } from './tipoLibro.schema';

@Schema({ collection: 'libros' })
export class Libro extends Document {
  @Prop({ required: true, maxlength: 150 })
  titulo: string;

  @Prop({ required: true, maxlength: 50 })
  autor: string;

  @Prop({ required: true, maxlength: 50 })
  editorial: string;

  @Prop({ type: Types.ObjectId, ref: 'EstadoLibro', required: true })
  estado: EstadoLibro | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TipoLibro', required: true })
  tipoLibro: TipoLibro | Types.ObjectId;
}

export const LibroSchema = SchemaFactory.createForClass(Libro);
