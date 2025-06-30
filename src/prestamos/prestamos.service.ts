import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PrestamoEntity } from '../entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPrestamoEntity } from '../entities/estadoPrestamo.entity';
import { LectorEntity } from '../entities/lector.entity';

@Injectable()
export class PrestamosService {
  private prestamoRepository: Repository<PrestamoEntity>;
  private estadoRepository: Repository<EstadoPrestamoEntity>;
  private lectorRepository: Repository<LectorEntity>;

  constructor(
    @InjectRepository(PrestamoEntity)
    prestamoRepository: Repository<PrestamoEntity>,

    @InjectRepository(EstadoPrestamoEntity)
    estadoRepository: Repository<EstadoPrestamoEntity>,

    @InjectRepository(LectorEntity)
    lectorRepository: Repository<LectorEntity>,
  ) {
    this.prestamoRepository = prestamoRepository;
    this.estadoRepository = estadoRepository;
    this.lectorRepository = lectorRepository;
  }

  async findAll(): Promise<PrestamoEntity[]> {
    return this.prestamoRepository.find({relations: ['lector', 'estado']});
  }
}