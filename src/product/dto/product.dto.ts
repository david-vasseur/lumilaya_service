import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const themeSchema = z.object({
    top: z.string().min(1, "La note de tête est requise"),
    heart: z.string().min(1, "La note de cœur est requise"),
    base: z.string().min(1, "La note de fond est requise"),
});

const variantSchema = z.object({
    name: z.string().min(1, "Le nom du variant est requis"),
    duration: z.number().int().positive(),
    weight: z.number().int().positive(),
    price: z.number().positive(),
});

const productMetaSchema = z.object({
    collection: z.string().min(1, "La collection est requise"),
    name: z.string().min(1, "Le nom du produit est requis"),
    slug: z.string().min(1, "Le slug est requis"),
    intro: z.string().min(1, "L'introduction est requise"),

    theme: themeSchema,

    stock: z.boolean(),
    promo: z.number().optional(),
    like: z.number().optional(),
});

export const productSchema = z.object({
    description: z.array(z.string()),
    images: z.array(z.string()),

    wellness: z.any().optional(),

    meta: productMetaSchema,

    variants: z.array(variantSchema).optional(),
    tags: z.array(z.string()).optional(),
});

export class ProductDto extends createZodDto(productSchema) {}