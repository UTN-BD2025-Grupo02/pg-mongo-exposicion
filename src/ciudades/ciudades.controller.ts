import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadDto } from '../interfaces/createCiudad.dto';
import { CiudadEntity } from '../entities/ciudad.entity';

@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto): Promise<CiudadEntity> {
    return this.ciudadesService.create(createCiudadDto);
  }

  @Get('all')
  findAll(): Promise<CiudadEntity[]> {
    return this.ciudadesService.findAll();
  }

  @Get(':nombre')
  findByName(nombre: string): Promise<CiudadEntity> {
    return this.ciudadesService.findByName(nombre);
  }

  @Delete(':nombre')
  delete(nombre: string): Promise<{message: string}> {
    return this.ciudadesService.delete(nombre);
  }
}