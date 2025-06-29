import { LibroEntity } from "../entities/libro.entity"
import { EstadoLibroEntity } from "../entities/estadoLibro.entity"
import { TipoLibroEntity } from "../entities/tipoLibro.entity"
import { dataSource } from './config/dataSoruce';

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

    // Obtener estados y tipos existentes
    const estados = await estadoLibroRepository.find()
    const tipos = await tipoLibroRepository.find()

    if (estados.length === 0 || tipos.length === 0) {
      console.log("❌ No hay estados o tipos de libro disponibles. Ejecuta primero esos seeds.")
      return
    }

    const libros = [
      { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", editorial: "Sudamericana" },
      { titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", editorial: "Planeta" },
      { titulo: "El Aleph", autor: "Jorge Luis Borges", editorial: "Emecé" },
      { titulo: "Rayuela", autor: "Julio Cortázar", editorial: "Sudamericana" },
      { titulo: "La casa de los espíritus", autor: "Isabel Allende", editorial: "Plaza & Janés" },
      { titulo: "El túnel", autor: "Ernesto Sabato", editorial: "Sur" },
      { titulo: "Pedro Páramo", autor: "Juan Rulfo", editorial: "Fondo de Cultura Económica" },
      { titulo: "Ficciones", autor: "Jorge Luis Borges", editorial: "Sur" },
      { titulo: "La tregua", autor: "Mario Benedetti", editorial: "Alfa" },
      { titulo: "El amor en los tiempos del cólera", autor: "Gabriel García Márquez", editorial: "Oveja Negra" },
      { titulo: "Sobre héroes y tumbas", autor: "Ernesto Sabato", editorial: "Fabril" },
      { titulo: "La ciudad y los perros", autor: "Mario Vargas Llosa", editorial: "Seix Barral" },
      { titulo: "El juguete rabioso", autor: "Roberto Arlt", editorial: "Claridad" },
      { titulo: "Boquitas pintadas", autor: "Manuel Puig", editorial: "Sudamericana" },
      { titulo: "El beso de la mujer araña", autor: "Manuel Puig", editorial: "Seix Barral" },
      { titulo: "Martín Fierro", autor: "José Hernández", editorial: "Imprenta de la Pampa" },
      { titulo: "Facundo", autor: "Domingo Faustino Sarmiento", editorial: "Progreso" },
      { titulo: "Los detectives salvajes", autor: "Roberto Bolaño", editorial: "Anagrama" },
      { titulo: "El reino de este mundo", autor: "Alejo Carpentier", editorial: "EDUCA" },
      { titulo: "La muerte de Artemio Cruz", autor: "Carlos Fuentes", editorial: "Fondo de Cultura Económica" },
    ]

    for (const libroData of libros) {
      // Asignar estado y tipo aleatorio
      const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)]
      const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)]

      const libro = libroRepository.create({
        ...libroData,
        estado: estadoAleatorio,
        tipoLibro: tipoAleatorio,
      })

      await libroRepository.save(libro)
    }

    console.log("✅ Libros sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando libros:", error)
  } finally {
    await dataSource.destroy()
  }
}