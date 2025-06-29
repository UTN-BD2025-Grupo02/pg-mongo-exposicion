import { TipoLibroEntity } from "../entities/tipoLibro.entity"
import { dataSource } from './config/dataSoruce';

export async function seedTiposLibro() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const tipoLibroRepository = dataSource.getRepository(TipoLibroEntity)

    // Verificar si ya existen datos
    const existingTipos = await tipoLibroRepository.count()
    if (existingTipos > 0) {
      console.log("Los tipos de libro ya están sembrados")
      return
    }

    const tipos = [
      { nombre: "Ficción", descripcion: "Novelas y cuentos de ficción" },
      { nombre: "No Ficción", descripcion: "Libros basados en hechos reales" },
      { nombre: "Ciencia", descripcion: "Libros científicos y técnicos" },
      { nombre: "Historia", descripcion: "Libros de historia y biografías" },
      { nombre: "Arte", descripcion: "Libros sobre arte y cultura" },
      { nombre: "Filosofía", descripcion: "Textos filosóficos y pensamiento" },
      { nombre: "Poesía", descripcion: "Colecciones de poemas y verso" },
      { nombre: "Teatro", descripcion: "Obras teatrales y dramáticas" },
      { nombre: "Infantil", descripcion: "Libros para niños y jóvenes" },
      { nombre: "Académico", descripcion: "Textos universitarios y de estudio" },
      { nombre: "Autoayuda", descripcion: "Libros de desarrollo personal" },
      { nombre: "Cocina", descripcion: "Libros de recetas y gastronomía" },
    ]

    for (const tipoData of tipos) {
      const tipo = tipoLibroRepository.create(tipoData)
      await tipoLibroRepository.save(tipo)
    }

    console.log("✅ Tipos de libro sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando tipos de libro:", error)
  } finally {
    await dataSource.destroy()
  }
}