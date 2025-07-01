import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  @IsOptional()
  readonly nombre?: string;

  @IsNumber()
  @IsOptional()
  readonly nroHabitante?: number;
}