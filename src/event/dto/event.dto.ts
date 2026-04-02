import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const eventSchema = z.object({
    name: z.string().min(1, "Le nom de l'événement est requis"),
    address: z.string().min(1, "L'adresse est requise"),
    city: z.string().min(1, "La ville est requise"),
    postalCode: z
        .string()
        .length(5, "Le code postal doit faire 5 caractères"),
    dateStart: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "dateStart doit être une date valide",
    }),
    dateEnd: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "dateEnd doit être une date valide",
    }),
    image: z.string(), 
    url: z.string().default("#"),
});

export class EventDto extends createZodDto(eventSchema) {}