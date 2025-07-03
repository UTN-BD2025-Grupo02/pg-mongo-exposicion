import { LibroEntity } from "../entities/libro.entity"
import { EstadoLibroEntity } from "../entities/estadoLibro.entity"
import { TipoLibroEntity } from "../entities/tipoLibro.entity"
import { dataSource } from './config/dataSource';

export async function seedLibros() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const libroRepository = dataSource.getRepository(LibroEntity)
    const estadoLibroRepository = dataSource.getRepository(EstadoLibroEntity)
    const tipoLibroRepository = dataSource.getRepository(TipoLibroEntity)

    // Verificar si ya existen datos
    const existingLibros = await libroRepository.count()
    if (existingLibros > 0) {
      console.log("Los libros ya están sembrados")
      return
    }

    // Obtener estados y tipos
    const disponible = await estadoLibroRepository.findOne({ where: { valor: "Disponible" } })
    const prestado = await estadoLibroRepository.findOne({ where: { valor: "Prestado" } })

    const ficcion = await tipoLibroRepository.findOne({ where: { nombre: "Ficción" } })
    const historia = await tipoLibroRepository.findOne({ where: { nombre: "Historia" } })
    const ciencia = await tipoLibroRepository.findOne({ where: { nombre: "Ciencia" } })
    const arte = await tipoLibroRepository.findOne({ where: { nombre: "Arte" } })
    const infantil = await tipoLibroRepository.findOne({ where: { nombre: "Infantil" } })

    if (!disponible || !prestado || !ficcion || !historia || !ciencia || !arte || !infantil) {
      console.log("❌ No se encontraron todos los estados o tipos. Ejecuta primero esos seeds.")
      return
    }

    const libros = [
      {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        editorial: "Sudamericana",
        estado: disponible,
        tipoLibro: ficcion,
      },
      {
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        editorial: "Planeta",
        estado: prestado,
        tipoLibro: ficcion,
      },
      { titulo: "El Aleph", autor: "Jorge Luis Borges", editorial: "Emecé", estado: disponible, tipoLibro: ficcion },
      {
        titulo: "Historia Argentina",
        autor: "Felipe Pigna",
        editorial: "Planeta",
        estado: disponible,
        tipoLibro: historia,
      },
      { titulo: "San Martín", autor: "Hugo Chumbita", editorial: "Emecé", estado: prestado, tipoLibro: historia },
      {
        titulo: "Física Cuántica",
        autor: "Stephen Hawking",
        editorial: "Crítica",
        estado: disponible,
        tipoLibro: ciencia,
      },
      { titulo: "El Universo", autor: "Carl Sagan", editorial: "Planeta", estado: disponible, tipoLibro: ciencia },
      { titulo: "Historia del Arte", autor: "Ernst Gombrich", editorial: "Phaidon", estado: prestado, tipoLibro: arte },
      {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        editorial: "Salamandra",
        estado: disponible,
        tipoLibro: infantil,
      },
      { titulo: "Matilda", autor: "Roald Dahl", editorial: "Alfaguara", estado: disponible, tipoLibro: infantil },
    ]

    for (const libroData of libros) {
      const libro = libroRepository.create(libroData)
      await libroRepository.save(libro)
    }

    console.log("✅ Libros sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando libros:", error)
  } finally {
    await dataSource.destroy()
  }
}