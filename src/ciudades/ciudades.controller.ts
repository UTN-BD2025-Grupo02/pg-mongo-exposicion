import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadDto } from '../interfaces/createCiudad.dto';
import { CiudadEntity } from '../entities/ciudad.entity';
import { PatchCiudadDto } from '../interfaces/patchCiudad.dto';

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
  findByName(@Param('nombre') nombre: string): Promise<CiudadEntity> {
    return this.ciudadesService.findByName(nombre);
  }

  @Patch(':nombre')
  patch(@Param('nombre') nombre: string, @Body() patchCiudadDto: PatchCiudadDto): Promise<CiudadEntity> {
    return this.ciudadesService.patch(nombre, patchCiudadDto);
  }

  @Delete(':nombre')
  delete(@Param('nombre') nombre: string): Promise<{message: string}> {
    return this.ciudadesService.delete(nombre);
  }
}