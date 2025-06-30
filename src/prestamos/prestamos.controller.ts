import { Controller, Get } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamoEntity } from '../entities/prestamo.entity';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.prestamosService.findAll();
  }
}