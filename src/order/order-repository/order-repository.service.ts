import { Injectable } from '@nestjs/common';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';

@Injectable()
export class OrderRepositoryService {

    constructor(private readonly prisma: PrismaDbLumilayaService) {}

    async getOrders() {
        return await this.prisma.order.findMany({
            select: {
                id:true,
                stripeSessionId: true,
                shippingStatus: true,   
                total: true,              
                createdAt: true,        
            }
        })
    }
}
