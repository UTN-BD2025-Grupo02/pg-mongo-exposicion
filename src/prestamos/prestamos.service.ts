import { Injectable } from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { PrestamoEntity } from '../entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPrestamoEntity } from '../entities/estadoPrestamo.entity';
import { LectorEntity } from '../entities/lector.entity';

@Injectable()
export class PrestamosService {
  private prestamoRepository: MongoRepository<PrestamoEntity>;
  private estadoRepository: MongoRepository<EstadoPrestamoEntity>;
  private lectorRepository: MongoRepository<LectorEntity>;

  constructor(
    @InjectRepository(PrestamoEntity)
    prestamoRepository: MongoRepository<PrestamoEntity>,

    @InjectRepository(EstadoPrestamoEntity)
    estadoRepository: MongoRepository<EstadoPrestamoEntity>,

    @InjectRepository(LectorEntity)
    lectorRepository: MongoRepository<LectorEntity>,
  ) {
    this.prestamoRepository = prestamoRepository;
    this.estadoRepository = estadoRepository;
    this.lectorRepository = lectorRepository;
  }

  async findAll(): Promise<any[]> {
    const prestamos = await this.prestamoRepository.find();

    const lectoresIds = prestamos.map((p) => p.lector);
    const estadosIds = prestamos.map((p) => p.estado);



    const lectores = await this.lectorRepository.find({
      where: { _id: {$in: lectoresIds} },
    });
    const estados = await this.estadoRepository.find({
      where: { _id: {$in: estadosIds} },
    });



    return prestamos.map((prestamo) => ({
      ...prestamo,
      lector: lectores.find((l) => l._id.equals(prestamo.lector)),
      estado: estados.find((e) => e._id.equals(prestamo.estado)),
    }));
  }
}