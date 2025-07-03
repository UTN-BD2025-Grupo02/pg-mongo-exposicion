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
          from: 'estado_prestamo',
          localField: 'estado',
          foreignField: '_id',
          as: 'estado'
        }
      },
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

      // Join con detalles del préstamo
      {
        $lookup: {
          from: 'detalle_prestamo',
          localField: '_id',
          foreignField: 'prestamo',
          as: 'detalles'
        }
      },

      // Dentro de cada detalle, hacer join con libro
      {
        $unwind: {
          path: '$detalles',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'libro',
          localField: 'detalles.libro',
          foreignField: '_id',
          as: 'detalles.libro'
        }
      },
      {
        $unwind: {
          path: '$detalles.libro',
          preserveNullAndEmptyArrays: true
        }
      },

      // Reconstruir array de detalles por préstamo
      {
        $group: {
          _id: '$_id',
          fechaPrestamo: { $first: '$fechaPrestamo' },
          fechaDevolucion: { $first: '$fechaDevolucion' },
          fechaDevolucionReal: { $first: '$fechaDevolucionReal' },
          lector: { $first: '$lector' },
          estado: { $first: '$estado' },
          detalles: { $push: '$detalles' }
        }
      }
    ]).toArray();
  }

}