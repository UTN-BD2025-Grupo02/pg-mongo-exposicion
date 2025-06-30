import { CiudadEntity } from "../entities/ciudad.entity"
import { dataSource } from "./config/dataSource"

export async function seedCiudades() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos MongoDB")

    const ciudadRepository = dataSource.getRepository(CiudadEntity)

    // Verificar si ya existen datos
    const existingCiudades = await ciudadRepository.count()
    if (existingCiudades > 0) {
      console.log("Las ciudades ya están sembradas")
      return
    }

    const ciudades = [
      { nombre: "Buenos Aires", nroHabitante: 3000000 },
      { nombre: "Córdoba", nroHabitante: 1500000 },
      { nombre: "Rosario", nroHabitante: 1200000 },
      { nombre: "Mendoza", nroHabitante: 115000 },
      { nombre: "La Plata", nroHabitante: 700000 },
    ]

    for (const ciudadData of ciudades) {
      const ciudad = ciudadRepository.create(ciudadData)
      await ciudadRepository.save(ciudad)
    }

    console.log("✅ Ciudades sembradas exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando ciudades:", error)
  } finally {
    await dataSource.destroy()
  }
}