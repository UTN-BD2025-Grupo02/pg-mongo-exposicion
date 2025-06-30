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

    // Obtener lectores y tipos
    const juan = await lectorRepository.findOne({ where: { nombre: "Juan", apellido: "Pérez" } })
    const maria = await lectorRepository.findOne({ where: { nombre: "María", apellido: "González" } })
    const carlos = await lectorRepository.findOne({ where: { nombre: "Carlos", apellido: "López" } })
    const ana = await lectorRepository.findOne({ where: { nombre: "Ana", apellido: "Martínez" } })

    const ficcion = await tipoLibroRepository.findOne({ where: { nombre: "Ficción" } })
    const historia = await tipoLibroRepository.findOne({ where: { nombre: "Historia" } })
    const ciencia = await tipoLibroRepository.findOne({ where: { nombre: "Ciencia" } })
    const arte = await tipoLibroRepository.findOne({ where: { nombre: "Arte" } })
    const infantil = await tipoLibroRepository.findOne({ where: { nombre: "Infantil" } })

    if (!juan || !maria || !carlos || !ana || !ficcion || !historia || !ciencia || !arte || !infantil) {
      console.log("❌ No se encontraron todos los lectores o tipos de libro.")
      return
    }

    const favoritos = [
      // Juan prefiere ficción e historia
      { idLector: juan, idTipoLibro: ficcion },
      { idLector: juan, idTipoLibro: historia },

      // María prefiere ficción y arte
      { idLector: maria, idTipoLibro: ficcion },
      { idLector: maria, idTipoLibro: arte },

      // Carlos prefiere historia y ciencia
      { idLector: carlos, idTipoLibro: historia },
      { idLector: carlos, idTipoLibro: ciencia },

      // Ana prefiere infantil y ficción
      { idLector: ana, idTipoLibro: infantil },
      { idLector: ana, idTipoLibro: ficcion },
    ]

    for (const favoritoData of favoritos) {
      const favorito = favoritosRepository.create(favoritoData)
      await favoritosRepository.save(favorito)
    }

    console.log("✅ Favoritos de lectores sembrados exitosamente")
  } catch (error) {
    console.error("❌ Error sembrando favoritos de lectores:", error)
  } finally {
    await dataSource.destroy()
  }
}