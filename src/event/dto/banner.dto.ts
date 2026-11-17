import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export const BannerSchema = z.object({
  active: z.boolean(),
  title: z.string(),
  promoCode: z.string().nullable().optional(),
  linkLabel: z.string().nullable().optional(),
  linkUrl: z.string().nullable().optional(),
  dateStart: z.string().datetime({ offset: true }).nullable().optional(),
  dateEnd: z.string().datetime({ offset: true }).nullable().optional(),
  bgColor: z
    .string()
    .regex(hexColorRegex, 'Couleur hexadécimale invalide')
    .optional(),
  textColor: z
    .string()
    .regex(hexColorRegex, 'Couleur hexadécimale invalide')
    .optional(),
});

export class BannerDto extends createZodDto(BannerSchema) {}
