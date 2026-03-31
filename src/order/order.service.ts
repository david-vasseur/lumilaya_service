import { Injectable } from '@nestjs/common';
import { OrderRepositoryService } from './order-repository/order-repository.service';
import { ShippingStatus } from 'prisma/generated/dbLumilaya/prisma/enums';
import { Resend } from 'resend';

@Injectable()
export class OrderService {

    constructor(
        private readonly orderRepository: OrderRepositoryService,
        private resend = new Resend(process.env.RESEND_API_KEY)
    ) {}

    async getAllOrders() {
        return await this.orderRepository.getOrders();
    }

    async getOrderById(id: number) {
        return this.orderRepository.getOrderById(id); 
    }

    async updateShippingStatus(id: number, shippingStatus: ShippingStatus) {
        const order = await this.orderRepository.getOrderById(id);
        if (!order) return null;

        const updatedOrder = await this.orderRepository.updateShippingStatus(id, shippingStatus);

        try {
            if (updatedOrder.shippingStatus === "DELIVERING") {
            await this.resend.emails.send({
                from: 'no-reply@lumilaya.fr',
                to: updatedOrder.email,
                subject: "Confirmation de l'envoi de votre commande",
                html: `
                <h1>Merci pour votre commande ${order.firstName} !</h1>
                <p>Votre commande <strong>#${order.stripeSessionId}</strong> a bien été envoyée ce jour.</p>
                <p>Vous devriez la recevoir très prochainement.</p>
                <p>Lumilaya</p>
                `,
            });
            } else if (updatedOrder.shippingStatus === "PROCESSING") {
            await this.resend.emails.send({
                from: 'no-reply@lumilaya.fr',
                to: updatedOrder.email,
                subject: "Votre commande est en préparation",
                html: `
                <h1>Merci pour votre commande ${order.firstName} !</h1>
                <p>Votre commande <strong>#${order.stripeSessionId}</strong> est bien enregistrée.</p>
                <p>Nous mettons tout en oeuvre pour l’expédier au plus vite.</p>
                <p>Lumilaya</p>
                `,
            });
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du mail", err);
        }

        return updatedOrder;
    }
}
