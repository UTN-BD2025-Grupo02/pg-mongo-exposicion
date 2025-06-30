import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNumber()
  @IsNotEmpty()
  readonly nroHabitante: number;
}