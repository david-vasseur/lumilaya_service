import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepositoryService } from './product-repository/product-repository.service';
import { ProductDto } from './dto/product.dto';
import { GcsService } from 'src/gcs/gcs.service';

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepositoryService,
		private readonly gcsService: GcsService,
	) {}

	// Creation de produit
	async createProduct(
        data: ProductDto,
        files: Express.Multer.File[]
    ) {

        if (!files || files.length === 0) {
            throw new BadRequestException(
                "Au moins une image est requise"
            );
        }


        const images = await this.gcsService.uploadMany(
            "ton-bucket-name",
            files
        );


        return this.productRepository.createProduct({
            ...data,
            images
        });
    }

	// 📦 Listing (léger)
	async getProducts() {
		return this.productRepository.getProducts();
	}

	// 🔍 Détail produit
	async getProductById(id: number) {
		const product = await this.productRepository.getProductById(id);

		if (!product) {
		throw new NotFoundException(`Product with id ${id} not found`);
		}

		return product;
	}

	// ✏️ Update produit
	async updateProduct(id: number, data: any) {
		// tu peux ajouter validation métier ici
		await this.ensureProductExists(id);

		return this.productRepository.updateProduct(id, data);
	}

	// ➕ Ajouter variant
	async addVariant(productId: number, data: any) {
		await this.ensureProductExists(productId);

		return this.productRepository.addVariant(productId, data);
	}

	// ✏️ Modifier variant
	async updateVariant(variantId: number, data: any) {
		return this.productRepository.updateVariant(variantId, data);
	}

	// 🏷️ Ajouter tags
	async addTags(productId: number, tags: string[]) {
		await this.ensureProductExists(productId);

		return this.productRepository.addTags(productId, tags);
	}

	// 🧠 Helper interne
	private async ensureProductExists(id: number) {
		const product = await this.productRepository.getProductById(id);

		if (!product) {
		throw new NotFoundException(`Product with id ${id} not found`);
		}
	}
}