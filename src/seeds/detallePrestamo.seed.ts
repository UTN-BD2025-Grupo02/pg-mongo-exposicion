import { DetallePrestamoEntity } from "../entities/detallePrestamo.entity"
import { PrestamoEntity } from "../entities/prestamo.entity"
import { LibroEntity } from "../entities/libro.entity"
import { LectorEntity } from "../entities/lector.entity"
import { dataSource } from './config/dataSource';

export async function seedDetallesPrestamo() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

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

    const prestamoJuan1 = await prestamoRepository.findOne({
      where: { lector: { id: juan?.id }, fechaPrestamo: new Date("2024-01-15") },
    })
    const prestamoMaria = await prestamoRepository.findOne({ where: { lector: { id: maria?.id } } })
    const prestamoCarlos = await prestamoRepository.findOne({ where: { lector: { id: carlos?.id } } })
    const prestamoAna = await prestamoRepository.findOne({ where: { lector: { id: ana?.id } } })
    const prestamoJuan2 = await prestamoRepository.findOne({
      where: { lector: { id: juan?.id }, fechaPrestamo: new Date("2024-02-15") },
    })

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
      console.log("No se encontraron todos los préstamos o libros necesarios")
      return
    }

    const detalles = [
      // Préstamo 1 de Juan - 2 libros
      { prestamo: prestamoJuan1, libro: cienAnos },
      { prestamo: prestamoJuan1, libro: elAleph },

      // Préstamo de María - 1 libro
      { prestamo: prestamoMaria, libro: donQuijote },

      // Préstamo de Carlos - 1 libro
      { prestamo: prestamoCarlos, libro: historiaArg },

      // Préstamo de Ana - 2 libros
      { prestamo: prestamoAna, libro: sanMartin },
      { prestamo: prestamoAna, libro: principito },

      // Préstamo 2 de Juan - 1 libro
      { prestamo: prestamoJuan2, libro: donQuijote },
    ]

    for (const detalleData of detalles) {
      const detalle = detallePrestamoRepository.create(detalleData)
      await detallePrestamoRepository.save(detalle)
    }

    console.log("Detalles de préstamo creados exitosamente")
  } catch (error) {
    console.error("Error creando los detalles de préstamo:", error)
  } finally {
    await dataSource.destroy()
  }
}