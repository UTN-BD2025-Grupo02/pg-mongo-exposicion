import { PrestamoEntity } from "../entities/prestamo.entity"
import { LectorEntity } from "../entities/lector.entity"
import { EstadoPrestamoEntity } from "../entities/estadoPrestamo.entity"
import { dataSource } from "./config/dataSoruce"

export async function seedPrestamos() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos MongoDB")

    const prestamoRepository = dataSource.getRepository(PrestamoEntity)
    const lectorRepository = dataSource.getRepository(LectorEntity)
    const estadoPrestamoRepository = dataSource.getRepository(EstadoPrestamoEntity)

    // Verificar si ya existen datos
    const existingPrestamos = await prestamoRepository.count()
    if (existingPrestamos > 0) {
      console.log("Los préstamos ya están sembrados")
      return
    }

    // Obtener lectores y estados
    const juan = await lectorRepository.findOne({ where: { nombre: "Juan", apellido: "Pérez" } })
    const maria = await lectorRepository.findOne({ where: { nombre: "María", apellido: "González" } })
    const carlos = await lectorRepository.findOne({ where: { nombre: "Carlos", apellido: "López" } })
    const ana = await lectorRepository.findOne({ where: { nombre: "Ana", apellido: "Martínez" } })

    const activo = await estadoPrestamoRepository.findOne({ where: { valor: "Activo" } })
    const devuelto = await estadoPrestamoRepository.findOne({ where: { valor: "Devuelto" } })
    const vencido = await estadoPrestamoRepository.findOne({ where: { valor: "Vencido" } })

    if (!juan || !maria || !carlos || !ana || !activo || !devuelto || !vencido) {
      console.log("❌ No se encontraron todos los lectores o estados. Ejecuta primero esos seeds.")
      return
    }

    const prestamos = [
      {
        fechaPrestamo: new Date("2024-01-15"),
        fechaDevolucion: new Date("2024-01-29"),
        fechaDevolucionReal: new Date("2024-01-28"),
        lector: juan._id,
        estado: devuelto._id,
      },
      {
        fechaPrestamo: new Date("2024-02-01"),
        fechaDevolucion: new Date("2024-02-15"),
        fechaDevolucionReal: null,
        lector: maria._id,
        estado: activo._id,
      },
      {
        fechaPrestamo: new Date("2024-01-20"),
        fechaDevolucion: new Date("2024-02-03"),
        fechaDevolucionReal: null,
        lector: carlos._id,
        estado: vencido._id,
      },
      {
        fechaPrestamo: new Date("2024-02-10"),
        fechaDevolucion: new Date("2024-02-24"),
        fechaDevolucionReal: new Date("2024-02-22"),
        lector: ana._id,
        estado: devuelto._id,
      },
      {
        fechaPrestamo: new Date("2024-02-15"),
        fechaDevolucion: new Date("2024-03-01"),
        fechaDevolucionReal: null,
        lector: juan._id,
        estado: activo._id,
      },
    ]

    for (const prestamoData of prestamos) {
      const prestamo = prestamoRepository.create(prestamoData)
      await prestamoRepository.save(prestamo)
    }

    console.log("✅ Préstamos sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando préstamos:", error)
  } finally {
    await dataSource.destroy()
  }
}
