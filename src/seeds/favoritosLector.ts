import { FavoritosLectorEntity } from "../entities/favoritoLector.entity"
import { LectorEntity } from "../entities/lector.entity"
import { TipoLibroEntity } from "../entities/tipoLibro.entity"
import { dataSource } from './config/dataSoruce';

export async function seedFavoritosLector() {
  try {
    await dataSource.initialize()
    console.log("Conexión establecida con la base de datos")

    const favoritosRepository = dataSource.getRepository(FavoritosLectorEntity)
    const lectorRepository = dataSource.getRepository(LectorEntity)
    const tipoLibroRepository = dataSource.getRepository(TipoLibroEntity)

    // Verificar si ya existen datos
    const existingFavoritos = await favoritosRepository.count()
    if (existingFavoritos > 0) {
      console.log("Los favoritos de lectores ya están sembrados")
      return
    }

    // Obtener lectores y tipos de libro existentes
    const lectores = await lectorRepository.find()
    const tiposLibro = await tipoLibroRepository.find()

    if (lectores.length === 0 || tiposLibro.length === 0) {
      console.log("❌ No hay lectores o tipos de libro disponibles. Ejecuta primero esos seeds.")
      return
    }

    // Crear favoritos para cada lector
    for (const lector of lectores) {
      // Cada lector puede tener entre 1 y 4 tipos de libro favoritos
      const numFavoritos = Math.floor(Math.random() * 4) + 1
      const tiposSeleccionados = new Set<number>()

      for (let i = 0; i < numFavoritos; i++) {
        let tipoAleatorio
        let intentos = 0

        // Evitar duplicados para el mismo lector
        do {
          tipoAleatorio = tiposLibro[Math.floor(Math.random() * tiposLibro.length)]
          intentos++
        } while (tiposSeleccionados.has(tipoAleatorio.id) && intentos < 10)

        if (!tiposSeleccionados.has(tipoAleatorio.id)) {
          tiposSeleccionados.add(tipoAleatorio.id)

          const favorito = favoritosRepository.create({
            idLector: lector,
            idTipoLibro: tipoAleatorio,
          })

          await favoritosRepository.save(favorito)
        }
      }
    }

    console.log("✅ Favoritos de lectores sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando favoritos de lectores:", error)
  } finally {
    await dataSource.destroy()
  }
}