import { Injectable } from '@nestjs/common';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class EventRepositoryService {

    constructor(private readonly prisma: PrismaDbLumilayaService) {}

    async createEvent(data: EventDto) {
        return await this.prisma.event.create({
            data: {
                name: data.name,
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                dateStart: new Date(data.dateStart),
                dateEnd: new Date(data.dateEnd),
                url: data.url !== "" ? data.url : undefined,
                image: data.image
            }
        });
    };

    async getEvents() {
        return await this.prisma.event.findMany({
            select: {
                id: true,
                name: true,
                dateStart: true,
                dateEnd: true,
                city: true,
                postalCode: true,
                image: true,
                url: true
            }
        });
    };
}
