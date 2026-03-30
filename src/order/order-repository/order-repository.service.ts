import { Injectable } from '@nestjs/common';
import { ShippingStatus } from 'prisma/generated/dbLumilaya/prisma/enums';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';

@Injectable()
export class OrderRepositoryService {

    constructor(private readonly prisma: PrismaDbLumilayaService) {}

    async getOrders() {
        return await this.prisma.order.findMany({
            select: {
                id:true,
                stripeSessionId: true,
                shippingCity: true,
                shippingStatus: true,   
                total: true,              
                createdAt: true,        
            }
        })
    }

    async getOrderById(id: number) {
        return await this.prisma.order.findUnique({
            where: {
                id
            },
            include: {
                items: true
            }
        })
    }

    async updateShippingStatus(id: number, shippingStatus: ShippingStatus) {
        return this.prisma.order.update({
            where: { id },
            data: { shippingStatus }
        });
    }
}
