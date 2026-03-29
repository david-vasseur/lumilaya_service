import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FingerprintGuard } from 'src/auth/fingerprint-auth.guard';

@UseGuards(JwtAuthGuard, FingerprintGuard)
@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
    ) {}

    @Get('all')
        async getAllOrders() {
            return this.orderService.getAllOrders();
        }
    }