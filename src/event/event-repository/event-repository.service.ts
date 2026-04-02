import { Injectable } from '@nestjs/common';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class EventRepositoryService {

    constructor(private readonly prisma: PrismaDbLumilayaService) {}

    async createEvent(data: EventDto) {
        return await this.prisma.event.create({
            data
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
