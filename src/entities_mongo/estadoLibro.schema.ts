import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EstadoLibroDocument = EstadoLibro & Document;

@Schema({ collection: 'estadoLibro' })
export class EstadoLibro {
  @Prop({ required: true, maxlength: 50 })
  valor: string;
}

export const EstadoLibroSchema = SchemaFactory.createForClass(EstadoLibro);
