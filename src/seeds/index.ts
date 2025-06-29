import {seedCiudades} from './ciudad.seed';
import { seedEstadosLibro } from './estadoLibro.seed';
import { seedEstadosPrestamo } from './estadoPrestamo.seed';

const seedCommands = [
  seedCiudades,
  seedEstadosLibro,
  seedEstadosPrestamo
]

async function runSeeds() {
  console.log("🌱 Iniciando proceso de sembrado de datos...\n");

  for (const seedCommand of seedCommands) {
    try {
      console.log(`📦 Ejecutando: ${seedCommand.name}`);
      await seedCommand();
      console.log(`✅ Completado: ${seedCommand.name}\n`);
    } catch (error) {
      console.error(`❌ Error ejecutando ${seedCommand.name}:`, error);
      break; // Detener si hay un error
    }
  }

  console.log("🎉 Proceso de sembrado completado!");
}
runSeeds();