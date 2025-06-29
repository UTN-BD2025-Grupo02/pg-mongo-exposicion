import { PrestamoEntity } from "../entities/prestamo.entity"
import { LectorEntity } from "../entities/lector.entity"
import { EstadoPrestamoEntity } from "../entities/estadoPrestamo.entity"
import { dataSource } from './config/dataSoruce';


function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export async function seedPrestamos() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const prestamoRepository = dataSource.getRepository(PrestamoEntity)
    const lectorRepository = dataSource.getRepository(LectorEntity)
    const estadoPrestamoRepository = dataSource.getRepository(EstadoPrestamoEntity)

    // Verificar si ya existen datos
    const existingPrestamos = await prestamoRepository.count()
    if (existingPrestamos > 0) {
      console.log("Los préstamos ya están sembrados")
      return
    }

    // Obtener lectores y estados existentes
    const lectores = await lectorRepository.find()
    const estados = await estadoPrestamoRepository.find()

    if (lectores.length === 0 || estados.length === 0) {
      console.log("❌ No hay lectores o estados de préstamo disponibles. Ejecuta primero esos seeds.")
      return
    }

    const estadoActivo = estados.find((e) => e.valor === "Activo")
    const estadoDevuelto = estados.find((e) => e.valor === "Devuelto")
    const estadoVencido = estados.find((e) => e.valor === "Vencido")

    // Generar préstamos de los últimos 6 meses
    const fechaInicio = new Date()
    fechaInicio.setMonth(fechaInicio.getMonth() - 6)
    const fechaFin = new Date()

    for (let i = 0; i < 25; i++) {
      const lectorAleatorio = lectores[Math.floor(Math.random() * lectores.length)]
      const fechaPrestamo = getRandomDate(fechaInicio, fechaFin)
      const fechaDevolucion = addDays(fechaPrestamo, 14) // 14 días de préstamo

      // Determinar estado y fecha de devolución real
      let estado = estadoActivo
      let fechaDevolucionReal: Date | null=null

      const random = Math.random()
      if (random < 0.6) {
        // 60% devueltos
        estado = estadoDevuelto
        fechaDevolucionReal = getRandomDate(fechaPrestamo, fechaDevolucion)
      } else if (random < 0.8) {
        // 20% vencidos
        estado = estadoVencido
      }
      // 20% activos (sin fecha de devolución real)

      const prestamo = prestamoRepository.create({
        fechaPrestamo,
        fechaDevolucion,
        fechaDevolucionReal,
        lector: lectorAleatorio,
        estado: estado || estadoActivo,
      })

      await prestamoRepository.save(prestamo)
    }

    console.log("✅ Préstamos sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando préstamos:", error)
  } finally {
    await dataSource.destroy()
  }
}
