import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TipoLibroDocument = TipoLibro & Document;

@Schema({ collection: 'tipoLibro' })
export class TipoLibro {
  @Prop({ required: true, maxlength: 50 })
  nombre: string;

  @Prop({ maxlength: 50 })
  descripcion?: string;
}

export const TipoLibroSchema = SchemaFactory.createForClass(TipoLibro);
