import {seedCiudades} from './ciudad.seed';
import { seedEstadosLibro } from './estadoLibro.seed';
import { seedEstadosPrestamo } from './estadoPrestamo.seed';
import { seedTiposLibro } from './tipoLibro.seed';
import { seedLectores } from './lector.seed';
import { seedLibros } from './libro.seed';
import { seedPrestamos } from './prestamo.seed';
import { seedDetallesPrestamo } from './detallePrestamo.seed';
import { seedFavoritosLector } from './favoritosLector';

const seedCommands = [
  seedCiudades,
  seedEstadosLibro,
  seedEstadosPrestamo,
  seedTiposLibro,
  seedLectores,
  seedLibros,
  seedPrestamos,
  seedDetallesPrestamo,
  seedFavoritosLector
]

async function runSeeds() {
  console.log("Iniciando proceso de sembrado de datos...\n");

  for (const seedCommand of seedCommands) {
    try {
      console.log(`Ejecutando: ${seedCommand.name}`);
      await seedCommand();
      console.log(`Completado: ${seedCommand.name}\n`);
    } catch (error) {
      console.error(`Error ejecutando ${seedCommand.name}:`, error);
      break; // Detener si hay un error
    }
  }

  console.log(" Proceso de sembrado completado");
}
runSeeds();