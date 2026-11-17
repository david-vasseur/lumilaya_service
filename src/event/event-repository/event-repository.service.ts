import { Injectable } from '@nestjs/common';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';
import { EventDto } from '../dto/event.dto';
import { BannerDto } from '../dto/banner.dto';

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
        const today = new Date();

        return await this.prisma.event.findMany({
            where: {
                dateStart: {
                    gte: today, 
                },
            },
            select: {
                id: true,
                name: true,
                dateStart: true,
                dateEnd: true,
                city: true,
                postalCode: true,
                image: true,
                url: true,
            },
            orderBy: {
                dateStart: 'asc', 
            },
            take: 3,
        });
    }

    async createEventBanner(data: BannerDto) {
    const payload = {
        active: data.active,
        title: data.title,
        promoCode: data.promoCode ?? null,
        linkLabel: data.linkLabel ?? null,
        linkUrl: data.linkUrl ?? null,
        dateStart: data.dateStart ? new Date(data.dateStart) : null,
        dateEnd: data.dateEnd ? new Date(data.dateEnd) : null,
        bgColor: data.bgColor,
        textColor: data.textColor,
    };

    return await this.prisma.promo.upsert({
        where: { id: 1 },
        update: payload,
        create: {
            id: 1,
            ...payload,
        },
    });
}

}
