import { DetallePrestamoEntity } from "../entities/detallePrestamo.entity"
import { PrestamoEntity } from "../entities/prestamo.entity"
import { LibroEntity } from "../entities/libro.entity"
import { dataSource } from './config/dataSoruce';

export async function seedDetallesPrestamo() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const detallePrestamoRepository = dataSource.getRepository(DetallePrestamoEntity)
    const prestamoRepository = dataSource.getRepository(PrestamoEntity)
    const libroRepository = dataSource.getRepository(LibroEntity)

    // Verificar si ya existen datos
    const existingDetalles = await detallePrestamoRepository.count()
    if (existingDetalles > 0) {
      console.log("Los detalles de préstamo ya están sembrados")
      return
    }

    // Obtener préstamos y libros existentes
    const prestamos = await prestamoRepository.find()
    const libros = await libroRepository.find()

    if (prestamos.length === 0 || libros.length === 0) {
      console.log("❌ No hay préstamos o libros disponibles. Ejecuta primero esos seeds.")
      return
    }

    // Crear detalles para cada préstamo
    for (const prestamo of prestamos) {
      // Cada préstamo puede tener entre 1 y 3 libros
      const numLibros = Math.floor(Math.random() * 3) + 1
      const librosSeleccionados = new Set<number>()

      for (let i = 0; i < numLibros; i++) {
        let libroAleatorio
        let intentos = 0

        // Evitar duplicados en el mismo préstamo
        do {
          libroAleatorio = libros[Math.floor(Math.random() * libros.length)]
          intentos++
        } while (librosSeleccionados.has(libroAleatorio.id) && intentos < 10)

        if (!librosSeleccionados.has(libroAleatorio.id)) {
          librosSeleccionados.add(libroAleatorio.id)

          const detalle = detallePrestamoRepository.create({
            libro: libroAleatorio,
            prestamo: prestamo,
          })

          await detallePrestamoRepository.save(detalle)
        }
      }
    }

    console.log("✅ Detalles de préstamo sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando detalles de préstamo:", error)
  } finally {
    await dataSource.destroy()
  }
}