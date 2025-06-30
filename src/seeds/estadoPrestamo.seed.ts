import { EstadoPrestamoEntity } from "../entities/estadoPrestamo.entity"
import { dataSource } from './config/dataSoruce';


export async function seedEstadosPrestamo() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const estadoPrestamoRepository = dataSource.getRepository(EstadoPrestamoEntity)

    // Verificar si ya existen datos
    const existingEstados = await estadoPrestamoRepository.count()
    if (existingEstados > 0) {
      console.log("Los estados de préstamo ya están sembrados")
      return
    }

    const estados = [{ valor: "Activo" }, { valor: "Devuelto" }, { valor: "Vencido" }]

    for (const estadoData of estados) {
      const estado = estadoPrestamoRepository.create(estadoData)
      await estadoPrestamoRepository.save(estado)
    }

    console.log("✅ Estados de préstamo sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando estados de préstamo:", error)
  } finally {
    await dataSource.destroy()
  }
}