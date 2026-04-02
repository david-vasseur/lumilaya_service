import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FingerprintGuard } from 'src/auth/fingerprint-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard, FingerprintGuard)
@Controller('event')
export class EventController {

    constructor(
            private readonly eventService: EventService,
        ) {}

    @Get('all')
        async getAllEvents() {
            return this.eventService.getAllEvents();
        }

    @Post('create')
    @UseInterceptors(FileInterceptor("image"))
        async create(
            @UploadedFile() file: Express.Multer.File,
            @Body() data: EventDto) {
            const event = await this.eventService.createEvent(data, file);

            if (event) {
                return {
                    success: true,
                    message: "Event créé avec succès"
                }
            } else {
                return {
                    success: false,
                    message: "Une erreur s'est produite"
                }
            }

        }
        
}
