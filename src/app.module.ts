import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const dbPort = Number.parseInt(process.env.DB_PORT ?? '5432', 10);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 🌍 Hace que las variables estén disponibles en toda la app sin re-importar
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // 🐘 Aquí especificamos el motor
      host: process.env.DB_HOST,
      port: dbPort,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, // 🔍 Busca automáticamente tus archivos .entity.ts
      synchronize: true, // ⚠️ Solo en desarrollo: crea las tablas automáticamente
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
