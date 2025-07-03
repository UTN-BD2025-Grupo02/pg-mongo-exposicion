import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PrestamoEntity } from '../entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PrestamosService {
  private prestamoRepository: Repository<PrestamoEntity>;

  constructor(
    @InjectRepository(PrestamoEntity)
    prestamoRepository: Repository<PrestamoEntity>,

  ) {
    this.prestamoRepository = prestamoRepository;
  }

  async findAll(): Promise<PrestamoEntity[]> {
    return this.prestamoRepository.find({relations: ['lector', 'estado']});
  }
}