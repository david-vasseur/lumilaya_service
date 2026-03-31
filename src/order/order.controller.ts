import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FingerprintGuard } from 'src/auth/fingerprint-auth.guard';
import { ShippingStatus } from 'prisma/generated/dbLumilaya/prisma/enums';

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
    
    @Get(':id')
        async getOneOrder(@Param('id') id: string) {
            const order = await this.orderService.getOrderById(Number(id));
            if (!order) {
                return { success: false, message: 'Aucune commande trouvée' };
            }
            return { success: true, message: `Commande n°${order.stripeSessionId}`, order };
        }

    @Patch(':id/shipping-status')
        async updateShippingStatus(
            @Param('id') id: string,
            @Body('shippingStatus') shippingStatus: ShippingStatus
        ) {
            const order = await this.orderService.updateShippingStatus(
                Number(id),
                shippingStatus
            );

            if (!order) {
                return {
                success: false,
                message: "Commande introuvable"
                };
            }

            return {
                success: true,
                message: "Statut de livraison mis à jour",
                order
            };
        }

    }