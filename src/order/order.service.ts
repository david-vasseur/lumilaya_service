import { Injectable } from '@nestjs/common';
import { OrderRepositoryService } from './order-repository/order-repository.service';
import { ShippingStatus } from 'prisma/generated/dbLumilaya/prisma/enums';

@Injectable()
export class OrderService {

    constructor(
        private readonly orderRepository: OrderRepositoryService,
    ) {}

    async getAllOrders() {
        return await this.orderRepository.getOrders();
    }

    async getOrderById(id: number) {
        return this.orderRepository.getOrderById(id); 
    }

    async updateShippingStatus(id: number, shippingStatus: ShippingStatus) {

    const order = await this.orderRepository.getOrderById(id);

    if (!order) {
        return {
            success: false,
            message: "Commande introuvable"
        };
    }

    const updatedOrder = await this.orderRepository.updateShippingStatus(id, shippingStatus);

    return {
        success: true,
        message: "Statut de livraison mis à jour",
        order: updatedOrder
    };
}
}
