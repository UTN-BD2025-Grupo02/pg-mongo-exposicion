import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexión a PostgreSQL (TypeORM)
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
        ssl: configService.get('DB_SSL') === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
      }),
    }),

    // Conexión a MongoDB (Mongoose)    
    MongooseModule.forRoot('mongodb://mongodb/mi-biblioteca'), // Si modifican los permisos aqui deberia de ir el user y el password.

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
