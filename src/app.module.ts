import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaDbNestService } from './prisma/prisma-db-nest.service';
import { PrismaDbLumilayaService } from './prisma/prisma-db-lumilaya.service';

@Module({
  imports: [AuthModule, OrderModule, ConfigModule.forRoot({
      isGlobal: true,
    }),],
  controllers: [AppController],
  providers: [AppService, PrismaDbNestService, PrismaDbLumilayaService],
})
export class AppModule {}
