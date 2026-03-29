import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepositoryService } from './order-repository/order-repository.service';
import { AuthRepositoryService } from 'src/auth/auth-repository/auth-repository.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepositoryService],
  imports: [AuthModule]
})
export class OrderModule {}
