# ========== STAGE 1: Build ==========
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# ========== STAGE 2: Production ==========
FROM node:20-alpine AS production

# Instalar dumb-init para manejar señales correctamente
RUN apk add --no-cache dumb-init

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev && npm cache clean --force

# Copiar la aplicación compilada y node_modules desde el stage anterior
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /usr/src/app

# Cambiar a usuario no-root
USER nestjs

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start:prod"]
