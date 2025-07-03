import { DetallePrestamoEntity } from "../entities/detallePrestamo.entity"
import { PrestamoEntity } from "../entities/prestamo.entity"
import { LibroEntity } from "../entities/libro.entity"
import { LectorEntity } from "../entities/lector.entity"
import { dataSource } from "./config/dataSource"

export async function seedDetallesPrestamo() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos MongoDB")

    const detallePrestamoRepository = dataSource.getRepository(DetallePrestamoEntity)
    const prestamoRepository = dataSource.getRepository(PrestamoEntity)
    const libroRepository = dataSource.getRepository(LibroEntity)
    const lectorRepository = dataSource.getRepository(LectorEntity)

    // Verificar si ya existen datos
    const existingDetalles = await detallePrestamoRepository.count()
    if (existingDetalles > 0) {
      console.log("Los detalles de préstamo ya están creados")
      return
    }

    // Obtener préstamos y libros específicos
    const juan = await lectorRepository.findOne({ where: { nombre: "Juan", apellido: "Pérez" } })
    const maria = await lectorRepository.findOne({ where: { nombre: "María", apellido: "González" } })
    const carlos = await lectorRepository.findOne({ where: { nombre: "Carlos", apellido: "López" } })
    const ana = await lectorRepository.findOne({ where: { nombre: "Ana", apellido: "Martínez" } })

    const prestamos = await prestamoRepository.find()
    const prestamoJuan1 = prestamos.find(
      (p) => p.lector.equals(juan?._id) && p.fechaPrestamo.getTime() === new Date("2024-01-15").getTime(),
    )
    const prestamoMaria = prestamos.find((p) => p.lector.equals(maria?._id))
    const prestamoCarlos = prestamos.find((p) => p.lector.equals(carlos?._id))
    const prestamoAna = prestamos.find((p) => p.lector.equals(ana?._id))
    const prestamoJuan2 = prestamos.find(
      (p) => p.lector.equals(juan?._id) && p.fechaPrestamo.getTime() === new Date("2024-02-15").getTime(),
    )

    const cienAnos = await libroRepository.findOne({ where: { titulo: "Cien años de soledad" } })
    const donQuijote = await libroRepository.findOne({ where: { titulo: "Don Quijote de la Mancha" } })
    const elAleph = await libroRepository.findOne({ where: { titulo: "El Aleph" } })
    const historiaArg = await libroRepository.findOne({ where: { titulo: "Historia Argentina" } })
    const sanMartin = await libroRepository.findOne({ where: { titulo: "San Martín" } })
    const principito = await libroRepository.findOne({ where: { titulo: "El Principito" } })

    if (
      !prestamoJuan1 ||
      !prestamoMaria ||
      !prestamoCarlos ||
      !prestamoAna ||
      !prestamoJuan2 ||
      !cienAnos ||
      !donQuijote ||
      !elAleph ||
      !historiaArg ||
      !sanMartin ||
      !principito
    ) {
      console.log("No se encontraron todos los préstamos o libros necesarios.")
      return
    }

    const detalles = [
      // Préstamo 1 de Juan - 2 libros
      { prestamo: prestamoJuan1._id, libro: cienAnos._id },
      { prestamo: prestamoJuan1._id, libro: elAleph._id },

      // Préstamo de María - 1 libro
      { prestamo: prestamoMaria._id, libro: donQuijote._id },

      // Préstamo de Carlos - 1 libro
      { prestamo: prestamoCarlos._id, libro: historiaArg._id },

      // Préstamo de Ana - 2 libros
      { prestamo: prestamoAna._id, libro: sanMartin._id },
      { prestamo: prestamoAna._id, libro: principito._id },

      // Préstamo 2 de Juan - 1 libro
      { prestamo: prestamoJuan2._id, libro: donQuijote._id },
    ]

    for (const detalleData of detalles) {
      const detalle = detallePrestamoRepository.create(detalleData)
      await detallePrestamoRepository.save(detalle)
    }

    console.log("Detalles de préstamo creados exitosamente")
  } catch (error) {
    console.error("Error al crear detalles de préstamo:", error)
  } finally {
    await dataSource.destroy()
  }
}
