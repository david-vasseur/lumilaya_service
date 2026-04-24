import { Injectable } from '@nestjs/common';
import { PrismaDbLumilayaService } from 'src/prisma/prisma-db-lumilaya.service';

@Injectable()
export class ProductRepositoryService {

    constructor(private readonly prisma: PrismaDbLumilayaService) {}

    async getProducts() {
        return this.prisma.product.findMany({
            select: {
            id: true,
            images: true,
            meta: {
                select: {
                name: true,
                slug: true,
                promo: true,
                stock: true,
                }
            },
            variants: {
                select: {
                name: true,
                price: true
                }
            }
            },
            orderBy: {
            createdAt: 'desc'
            }
        })
    }

    async getProductById(id: number) {
        return this.prisma.product.findUnique({
            where: { id },
            select: {
            id: true,
            description: true,
            images: true,
            wellness: true,

            meta: {
                select: {
                name: true,
                slug: true,
                intro: true,
                collection: true,
                theme: true,
                stock: true,
                promo: true,
                like: true
                }
            },

            variants: true,
            tags: true,
            reviews: true
            }
        })
    }

    async updateProduct(id: number, data: {
        description?: string[]
        images?: string[]
        wellness?: any

        meta?: {
            name?: string
            intro?: string
            collection?: string
            theme?: any
            stock?: boolean
            promo?: number
        }
        }) {
        return this.prisma.product.update({
            where: { id },
            data: {
            description: data.description,
            images: data.images,
            wellness: data.wellness,

            meta: data.meta
                ? {
                    update: data.meta
                }
                : undefined
            }
        })
    }

    async addVariant(productId: number, data: {
        name: string
        duration: number
        weight: number
        price: number
    }) {
        return this.prisma.variant.create({
            data: {
            ...data,
            productId
            }
        })
    }

    async updateVariant(variantId: number, data: {
        name?: string
        duration?: number
        weight?: number
        price?: number
    }) {
        return this.prisma.variant.update({
            where: { id: variantId },
            data
        })
    }

    async addTags(productId: number, tagNames: string[]) {
        return this.prisma.product.update({
            where: { id: productId },
            data: {
            tags: {
                connectOrCreate: tagNames.map(name => ({
                where: { name },
                create: { name }
                }))
            }
            },
            include: {
            tags: true
            }
        })
    }
}
