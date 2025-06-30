import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dynamicImport } from './utils/dynamic-import';
import { entities } from './entities';
import { CiudadesController } from './ciudades/ciudades.controller';
import { CiudadesService } from './ciudades/ciudades.service';




@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGO_HOST'),
        port: +configService.get('MONGO_PORT'),
        username: configService.get('MONGO_USERNAME'),
        password: configService.get('MONGO_PASSWORD'),
        database: configService.get('MONGO_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        useUnifiedTopology: true,
        retryWrites:false,
        ssl: configService.get('MONGO_SSL')
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

  controllers: [AppController, CiudadesController],
  providers: [AppService, CiudadesService],
})
export class AppModule {}
