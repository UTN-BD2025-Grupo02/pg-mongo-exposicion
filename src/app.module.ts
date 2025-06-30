import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dynamicImport } from './utils/dynamic-import';
import { entities } from './entities';
import { CiudadesController } from './ciudades/ciudades.controller';
import { CiudadesService } from './ciudades/ciudades.service';
import { PrestamosController } from './prestamos/prestamos.controller';
import { PrestamosService } from './prestamos/prestamos.service';




@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: configService.get('DB_SSL')
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),
    dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const AdminJS = (await dynamicImport('adminjs')).default;
          const { Database, Resource } = await dynamicImport('@adminjs/typeorm');
          AdminJS.registerAdapter({ Database, Resource });
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [...entities],
            },
          };
        },
      }),
    ) as any,

    TypeOrmModule.forFeature(entities),
  ],

  controllers: [AppController, CiudadesController, PrestamosController],
  providers: [AppService, CiudadesService, PrestamosService],
})
export class AppModule {}
