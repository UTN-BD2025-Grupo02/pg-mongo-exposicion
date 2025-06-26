import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({collection: 'detallesPrestamo'})
export class DetallePrestamoSchema extends Document {

  @Prop({type: Types.ObjectId, ref: 'Libro', required: true})
  libro: string; //MODIFICAR
}