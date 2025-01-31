import { z } from "zod";

export const registerSchema = z.object({
    email: z
    .string({
        required_error: 'el email es requerido',
    })
    .email({
        message: 'email no valido',
    }),
    password : z
    .string({ 
        required_error:'password requerido',
    })
    .min(8, {
        message: 'el password debe tener almenos 8 caracteres',
    }),

});

export  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})
