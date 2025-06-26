import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({collection: 'ciudades'})
export class Ciudad extends Document {
  @Prop({required: true, maxlength: 50})
  nombre: string;

  @Prop({required: true})
  nroHabitante: number;
}

export const CiudadSchema = SchemaFactory.createForClass(Ciudad);