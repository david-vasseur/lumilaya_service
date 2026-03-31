import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepositoryService } from './order-repository/order-repository.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';
import { ResendProvider } from './resend.provider';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepositoryService, PrismaDbLumilayaService, ResendProvider],
  imports: [AuthModule]
})
export class OrderModule {}
