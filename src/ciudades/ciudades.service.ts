import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CiudadEntity } from '../entities/ciudad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCiudadDto } from '../interfaces/createCiudad.dto';

@Injectable()
export class CiudadesService {
  private ciudadRepository: MongoRepository<CiudadEntity>;

  constructor(
    @InjectRepository(CiudadEntity)
    ciudadRepository: MongoRepository<CiudadEntity>,
  ) {
    this.ciudadRepository = ciudadRepository;
  }

  async create(createCiudadDto: CreateCiudadDto): Promise<CiudadEntity> {
    const ciudad = this.ciudadRepository.create(createCiudadDto);
    return this.ciudadRepository.save(ciudad);
  }

  async findAll(): Promise<CiudadEntity[]> {
    return this.ciudadRepository.find();
  }



  async findByName(nombre: string): Promise<CiudadEntity> {
    const ciudad  = await this.ciudadRepository.findOne({where: {nombre}})

    if(!ciudad) {
      throw new NotFoundException('Ciudad no encontrada')
    }
    return ciudad;
  }

  async delete(nombre: string): Promise<{message: string}> {
    const ciudad = await this.findByName(nombre);

    await this.ciudadRepository.remove(ciudad);

    return {message: 'Ciudad eliminada'}
  }
}