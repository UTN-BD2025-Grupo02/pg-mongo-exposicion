import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { PrestamoEntity } from '../entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PrestamosService {
  private prestamoRepository: MongoRepository<PrestamoEntity>;


  constructor(
    @InjectRepository(PrestamoEntity)
    prestamoRepository: MongoRepository<PrestamoEntity>,
  ) {
    this.prestamoRepository = prestamoRepository;
  }

  async findAll(): Promise<any[]> {
    return await this.prestamoRepository.aggregate([
      // Join con estado del préstamo
      {
        $lookup: {
          //coleccion a unir
          from: 'estado_prestamo',
          //campo en la entidad actual (Prestamo)
          localField: 'estado',
          //Campo en la entidad a unir (EstadoPrestamo)
          foreignField: '_id',
          //Nombre del campo en la entidad resultante
          as: 'estado'
        }
      },
      //Convierte el array en un objeto
      { $unwind: '$estado' },

      // Join con lector
      {
        $lookup: {
          from: 'lector',
          localField: 'lector',
          foreignField: '_id',
          as: 'lector'
        }
      },
      { $unwind: '$lector' },

    ]).toArray();
  }

}