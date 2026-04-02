import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { AuthModule } from 'src/auth/auth.module';
import { EventRepositoryService } from './event-repository/event-repository.service';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';
import { GcsModule } from 'src/gcs/gcs.module';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaDbLumilayaService, EventRepositoryService],
  imports: [AuthModule, GcsModule]
})
export class EventModule {}
