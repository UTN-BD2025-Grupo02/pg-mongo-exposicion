import { exec } from "child_process"
import { promisify } from "util"
import {seedCiudades} from './ciudad.seed';

const execAsync = promisify(exec)

const seedCommands = [
  seedCiudades()
]

async function runSeeds(){
  console.log("🌱 Iniciando proceso de sembrado de datos...\n")

  for (const seedCommand of seedCommands) {
    try {
      console.log(`📦 Ejecutando: ${seedCommand}`)
      const { stdout, stderr } = await execAsync(`npx ts-node scripts/${seedCommand}`)

      if (stdout) console.log(stdout)
      if (stderr) console.error(stderr)

      console.log(`✅ Completado: ${seedCommand}\n`)
    } catch (error) {
      console.error(`❌ Error ejecutando ${seedCommand}:`, error)
      break // Detener si hay un error
    }
  }

  console.log("🎉 Proceso de sembrado completado!")
}
runSeeds()