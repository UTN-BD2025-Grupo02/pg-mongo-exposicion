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
          //Para evitar eliminar detalles que no tengan libro
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

      // Reconstruir el array de prestamos para incorporar los detalles
      {
        $group: {
          _id: '$_id',
          fechaPrestamo: { $first: '$fechaPrestamo' },
          fechaDevolucion: { $first: '$fechaDevolucion' },
          fechaDevolucionReal: { $first: '$fechaDevolucionReal' },
          //$first mantiene los primeros elementos (incorporados previamente) de cada grupo
          lector: { $first: '$lector' },
          estado: { $first: '$estado' },
          //$push incorpora los elementos de cada grupo en un array
          detalles: { $push: '$detalles' }
        }
      }
    ]).toArray();
  }

}