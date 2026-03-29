// prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaDbNestService } from './prisma-db-nest.service';
import { PrismaDbLumilayaService } from './prisma-db-lumilaya.service';

@Global()
@Module({
    providers: [PrismaDbNestService, PrismaDbLumilayaService],
    exports: [PrismaDbNestService, PrismaDbLumilayaService],
})
export class PrismaModule {}