import { LectorEntity } from "../entities/lector.entity"
import { CiudadEntity } from "../entities/ciudad.entity"
import { dataSource } from './config/dataSource';

export async function seedLectores() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const lectorRepository = dataSource.getRepository(LectorEntity)
    const ciudadRepository = dataSource.getRepository(CiudadEntity)

    // Verificar si ya existen datos
    const existingLectores = await lectorRepository.count()
    if (existingLectores > 0) {
      console.log("Los lectores ya están sembrados")
      return
    }

    // Obtener ciudades por nombre
    const buenosAires = await ciudadRepository.findOne({ where: { nombre: "Buenos Aires" } })
    const cordoba = await ciudadRepository.findOne({ where: { nombre: "Córdoba" } })
    const rosario = await ciudadRepository.findOne({ where: { nombre: "Rosario" } })
    const mendoza = await ciudadRepository.findOne({ where: { nombre: "Mendoza" } })
    const laPlata = await ciudadRepository.findOne({ where: { nombre: "La Plata" } })

    if (!buenosAires || !cordoba || !rosario || !mendoza || !laPlata) {
      console.log("❌ No se encontraron todas las ciudades. Ejecuta primero el seed de ciudades.")
      return
    }

    const lectores = [
      { nombre: "Juan", apellido: "Pérez", ciudadId: buenosAires },
      { nombre: "María", apellido: "González", ciudadId: cordoba },
      { nombre: "Carlos", apellido: "López", ciudadId: rosario },
      { nombre: "Ana", apellido: "Martínez", ciudadId: mendoza },
      { nombre: "Luis", apellido: "García", ciudadId: laPlata },
      { nombre: "Laura", apellido: "Rodríguez", ciudadId: buenosAires },
      { nombre: "Diego", apellido: "Fernández", ciudadId: cordoba },
      { nombre: "Sofía", apellido: "Sánchez", ciudadId: rosario },
    ]

    for (const lectorData of lectores) {
      const lector = lectorRepository.create(lectorData)
      await lectorRepository.save(lector)
    }

    console.log("✅ Lectores sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando lectores:", error)
  } finally {
    await dataSource.destroy()
  }
}