import { EstadoLibroEntity } from "../entities/estadoLibro.entity"
import { dataSource } from './config/dataSource';


export async function seedEstadosLibro() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const estadoLibroRepository = dataSource.getRepository(EstadoLibroEntity)

    // Verificar si ya existen datos
    const existingEstados = await estadoLibroRepository.count()
    if (existingEstados > 0) {
      console.log("Los estados de libro ya están creados")
      return
    }

    const estados = [{ valor: "Disponible" }, { valor: "Prestado" }, { valor: "En reparación" }, { valor: "Perdido" }]

    for (const estadoData of estados) {
      const estado = estadoLibroRepository.create(estadoData)
      await estadoLibroRepository.save(estado)
    }

    console.log("Estados de libro creados exitosamente")
  } catch (error) {
    console.error("Error creando los estados de libro:", error)
  } finally {
    await dataSource.destroy()
  }
}