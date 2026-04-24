import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepositoryService } from './product-repository/product-repository.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepositoryService
  ) {}

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