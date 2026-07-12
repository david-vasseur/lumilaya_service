import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ProductRepositoryService } from './product-repository/product-repository.service';
import { ProductDto } from './dto/product.dto';
import { GcsService } from 'src/gcs/gcs.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductService {

	private readonly logger = new Logger(ProductService.name)

	constructor(
		private readonly productRepository: ProductRepositoryService,
		private readonly gcsService: GcsService,
		
	) {}

	// Creation de produit
	async createProduct(
		data: ProductDto,
		files: Express.Multer.File[]
	) {
		try {
			this.logger.log(`🚀 Création produit démarrée : "${data.meta.name}"`);

			if (!files || files.length === 0) {
				this.logger.warn('⚠️ Aucun fichier image reçu');
				throw new BadRequestException(
					"Au moins une image est requise"
				);
			}

			this.logger.debug(
				`📸 ${files.length} image(s) à uploader`
			);

			const images = await this.gcsService.uploadMany(
				"lumilaya",
				files
			);

			this.logger.log(
				`☁️ Upload GCS terminé : ${images.length} image(s) envoyée(s)`
			);

			const product = await this.productRepository.createProduct({
				...data,
				images
			});

			this.logger.log(
				`✅ Produit créé avec succès : ${product.id}`
			);

			return product;

		} catch(error) {
			this.logger.error(
				"❌ Erreur création produit",
				error instanceof Error ? error.stack : String(error)
			);

			throw error;
		}
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

	// Ajout d'une image
	async uploadImage(
		id: number,
		file: Express.Multer.File
	) {

		console.log("📸 ProductService.uploadImage start", {
			productId: id,
			filename: file?.originalname,
			size: file?.size,
			mimetype: file?.mimetype,
		});


		console.log("🔎 Checking product exists...");

		await this.ensureProductExists(id);

		console.log("✅ Product exists");


		const filename = `${randomUUID()}-${file.originalname}`;

		console.log("☁️ Uploading to GCS...", {
			bucket: "lumilaya",
			filename,
			contentType: file.mimetype,
			bufferSize: file.buffer.length,
		});


		const url = await this.gcsService.upload(
			"lumilaya",
			file.buffer,
			filename,
			file.mimetype
		);


		console.log("✅ GCS upload done", {
			url
		});


		return {
			url
		};
	}
}