import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    database: z.string(),
});

export class SignupDto extends createZodDto(signupSchema) {}