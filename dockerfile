# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala TODAS las dependencias (incluyendo devDependencies) para que el comando 'nest' esté disponible
RUN npm install

# Copia el resto del código de tu aplicación al directorio de trabajo
COPY . .

# Asegúrate de que tu package.json tenga "build": "npx nest build"
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará (Next.js por defecto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación Next.js en producción (asumiendo que 'start' es para la app construida)
# Si es una aplicación NestJS pura, podrías necesitar 'npm run start:prod' o similar
CMD ["npm", "run", "start","dev"]
