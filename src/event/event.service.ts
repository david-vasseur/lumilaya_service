import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { EventRepositoryService } from './event-repository/event-repository.service';
import { GcsService } from 'src/gcs/gcs.service';

@Injectable()
export class EventService {

    constructor(
        private readonly eventRepository: EventRepositoryService,
        private readonly gcsService: GcsService,
        
    ) {}

    getAllEvents() {}

    async createEvent(data: EventDto, file: Express.Multer.File) {

        try {
            
            const imageUrl = await this.gcsService.upload(
                "lumilaya",
                file.buffer,
                file.originalname,
                file.mimetype
            );

            const newData = { ...data, image: imageUrl };

            return await this.eventRepository.createEvent(newData);

        } catch (error) {
            console.error("message: ", error);
            throw error;
        }
    }

}
