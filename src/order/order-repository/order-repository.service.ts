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
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                shippingAddress: true,
                shippingCity: true,
                shippingPostalCode: true,
                shippingCountry: true,  
                shippingType: true,        
                shippingPrice: true,      
                billingAddress: true,     
                billingCity: true,        
                billingPostalCode: true,  
                billingCountry: true,   
                acceptCGV: true,        
                total: true,         
                items: true,      
                createdAt: true,        
            }
        })
    }
}
