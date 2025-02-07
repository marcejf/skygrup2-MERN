import { z } from "zod";



export const createPasajeroSchema = z.object({  
    documento: z
    .number({
        required_error:'El documento es requerido',
    }),
    nombres: z
    .string({
        required_error:'Este campo nombres es requerido',
    }),
    
    apellidos: z
    .string({
        required_error:'Este campo apellidos es requerido',
    }),
    pais: z
    .string({
        required_error:'Este campo pais  es requerido',
    }),
    edad: z
    .number({
        required_error:'Este campo  edad es requerido',
    }),
    telefono: z
    .number({
        required_error:'Este campo telefono es requerido',
    }),
    email: z
    .string({
        required_error:'Este campo  email es requerido',
    }),
});
