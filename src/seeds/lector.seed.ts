import { LectorEntity } from "../entities/lector.entity"
import { CiudadEntity } from "../entities/ciudad.entity"
import { dataSource } from './config/dataSoruce';

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

    // Obtener ciudades existentes
    const ciudades = await ciudadRepository.find()
    if (ciudades.length === 0) {
      console.log("❌ No hay ciudades disponibles. Ejecuta primero el seed de ciudades.")
      return
    }

    const lectores = [
      { nombre: "María", apellido: "González" },
      { nombre: "Juan", apellido: "Pérez" },
      { nombre: "Ana", apellido: "Rodríguez" },
      { nombre: "Carlos", apellido: "López" },
      { nombre: "Laura", apellido: "Martínez" },
      { nombre: "Diego", apellido: "Fernández" },
      { nombre: "Sofía", apellido: "García" },
      { nombre: "Miguel", apellido: "Sánchez" },
      { nombre: "Valentina", apellido: "Romero" },
      { nombre: "Alejandro", apellido: "Torres" },
      { nombre: "Camila", apellido: "Flores" },
      { nombre: "Sebastián", apellido: "Morales" },
      { nombre: "Isabella", apellido: "Herrera" },
      { nombre: "Mateo", apellido: "Vargas" },
      { nombre: "Lucía", apellido: "Castro" },
    ]

    for (const lectorData of lectores) {
      // Asignar ciudad aleatoria
      const ciudadAleatoria = ciudades[Math.floor(Math.random() * ciudades.length)]

      const lector = lectorRepository.create({
        ...lectorData,
        ciudadId: ciudadAleatoria,
      })

      await lectorRepository.save(lector)
    }

    console.log("✅ Lectores sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando lectores:", error)
  } finally {
    await dataSource.destroy()
  }
}
