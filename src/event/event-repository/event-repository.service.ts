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
        return await this.prisma.promo.create({
            data: {
                active: data.active,
                title: data.title,
                promoCode: data.promoCode,
                linkLabel: data.linkLabel,
                linkUrl: data.linkUrl,
                dateStart: data.dateStart ? new Date(data.dateStart) : undefined,
                dateEnd: data.dateEnd ? new Date(data.dateEnd) : undefined,
                bgColor: data.bgColor,
                textColor: data.textColor
            }
        });
    }
}
