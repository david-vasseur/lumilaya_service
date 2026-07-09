import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';
import { ProductRepositoryService } from './product-repository/product-repository.service';
import { GcsModule } from 'src/gcs/gcs.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaDbLumilayaService, ProductRepositoryService],
  imports: [AuthModule, GcsModule]
})
export class ProductModule {}
