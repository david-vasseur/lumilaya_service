import { Injectable } from '@nestjs/common';
import { OrderRepositoryService } from './order-repository/order-repository.service';

@Injectable()
export class OrderService {

    constructor(
        private readonly orderRepository: OrderRepositoryService,
    ) {}

    async getAllOrders() {
        return await this.orderRepository.getOrders();
    }
}
