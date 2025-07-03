import { TipoLibroEntity } from "../entities/tipoLibro.entity"
import { dataSource } from './config/dataSource';

export async function seedTiposLibro() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const tipoLibroRepository = dataSource.getRepository(TipoLibroEntity)

    // Verificar si ya existen datos
    const existingTipos = await tipoLibroRepository.count()
    if (existingTipos > 0) {
      console.log("Los tipos de libro ya están creados")
      return
    }

    const tipos = [
      { nombre: "Ficción", descripcion: "Novelas y cuentos" },
      { nombre: "Historia", descripcion: "Libros de historia" },
      { nombre: "Ciencia", descripcion: "Libros científicos" },
      { nombre: "Arte", descripcion: "Libros de arte" },
      { nombre: "Infantil", descripcion: "Libros para niños" },
    ]

    for (const tipoData of tipos) {
      const tipo = tipoLibroRepository.create(tipoData)
      await tipoLibroRepository.save(tipo)
    }

    console.log("Tipos de libro creados exitosamente")
  } catch (error) {
    console.error("Error creando los tipos de libro:", error)
  } finally {
    await dataSource.destroy()
  }
}