import { CiudadEntity } from "../entities/ciudad.entity"
import {dataSource} from './config/dataSoruce';

export async function seedCiudades() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const ciudadRepository = dataSource.getRepository(CiudadEntity)

    // Verificar si ya existen datos
    const existingCiudades = await ciudadRepository.count()
    if (existingCiudades > 0) {
      console.log("Las ciudades ya están sembradas")
      return
    }

    const ciudades = [
      { nombre: "Buenos Aires", nroHabitante: 3075646, },
      { nombre: "Córdoba", nroHabitante: 1454536, },
      { nombre: "Rosario", nroHabitante: 1193605, },
      { nombre: "Mendoza", nroHabitante: 115041, },
      { nombre: "La Plata", nroHabitante: 694253, },
      { nombre: "San Miguel de Tucumán", nroHabitante: 548866, },
      { nombre: "Mar del Plata", nroHabitante: 614350, },
      { nombre: "Salta", nroHabitante: 535303, },
      { nombre: "Santa Fe", nroHabitante: 391231, },
      { nombre: "San Juan", nroHabitante: 112778, },
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
