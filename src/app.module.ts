import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dynamicImport } from './utils/dynamic-import';
import { MongooseModule } from '@nestjs/mongoose';
import { Ciudad, CiudadModel, CiudadSchema } from './schemas';




@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: `mongodb://${cfg.get('MONGO_INITDB_ROOT_USERNAME')}:${cfg.get('MONGO_INITDB_ROOT_PASSWORD')}@localhost:27017/${cfg.get('MONGO_DB_DATABASE')}`,
      }),
    }),

    // Registro de esquemas/models
    MongooseModule.forFeature([
      { name: Ciudad.name, schema: CiudadSchema },
    ]),



    dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const AdminJS = (await dynamicImport('adminjs')).default;
          const { Database, Resource } = await dynamicImport('@adminjs/mongoose');
          AdminJS.registerAdapter({ Database, Resource });
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                { resource: CiudadModel },
              ],
            },
          };
        },
      }),
    ) as any,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
