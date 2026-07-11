import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Body,
  Post,
  Logger,
  UseInterceptors,
  UploadedFiles,
  BadRequestException
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FingerprintGuard } from 'src/auth/fingerprint-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

    @UseGuards(JwtAuthGuard, FingerprintGuard)
    @Controller('product')
    export class ProductController {
        constructor(private readonly productService: ProductService) {}
        private readonly logger = new Logger(ProductController.name)

        // 📦 GET /product/all
        @Get('all')
            async getAllProducts() {
                return this.productService.getProducts();
        }

        // 🔍 GET /product/:id
        @Get(':id')
            async getProductById(
                @Param('id', ParseIntPipe) id: number
            ) {
                return this.productService.getProductById(id);
        }

        // ✏️ PATCH /product/:id
        @Patch(':id')
            async updateProduct(
                @Param('id', ParseIntPipe) id: number,
                @Body() data: any
            ) {
                return this.productService.updateProduct(id, data);
        }

        // ➕ POST /product/:id/variant
        @Post(':id/variant')
            async addVariant(
                @Param('id', ParseIntPipe) id: number,
                @Body() data: any
            ) {
                return this.productService.addVariant(id, data);
        }

        // ✏️ PATCH /product/variant/:variantId
        @Patch('variant/:variantId')
            async updateVariant(
                @Param('variantId', ParseIntPipe) variantId: number,
                @Body() data: any
            ) {
                return this.productService.updateVariant(variantId, data);
        }

        // 🏷️ POST /product/:id/tags
        @Post(':id/tags')
            async addTags(
                @Param('id', ParseIntPipe) id: number,
                @Body('tags') tags: string[]
            ) {
                return this.productService.addTags(id, tags);
            }

        // ➕ Création
        @Post('create')
        @UseInterceptors(FilesInterceptor('images'))
        async createProduct(
            @UploadedFiles() files: Express.Multer.File[],
            @Body('product') product: string
        ) {
            this.logger.log('📥 Création produit - Requête reçue');
            this.logger.debug(`📸 Nombre d'images reçues : ${files?.length ?? 0}`);

            let data:ProductDto;

            try {
                data = JSON.parse(product);
            } catch (error) {
                this.logger.error('❌ Impossible de parser le produit JSON');
                throw new BadRequestException('Produit invalide');
            }
            
            this.logger.log(`📦 Envoi du produit "${data.meta.name}" au service création`);

            return this.productService.createProduct(
                data,
                files
            );
        }
    }
