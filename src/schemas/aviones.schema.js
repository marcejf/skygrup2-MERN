import { z } from "zod";

//matricula modelo fabricante capacidad rangoVueloKM fechaFabricacion

export const createAvionesSchema = z.object({
    matricula: z  
    .string({
        required_error:'La matricula del avion es requerido',  
    }),
    modelo: z
    .string({
        required_error: 'el modelo del avion es requerida',
    }),
    fabricante: z
    .string({
        required_error:'el fabricante del avion es requerido',
    }),
    capacidad: z
    .number({
        required_error: 'la capacidad del avion es requerido',
    }),
    rangoVueloKM: z
    .number({
        required_error: 'lel rango de vuelo del avion es requerida',
    }), 
    fechaFabricacion: z
    .number({
        required_error: 'El año de fabricacion del avion es requerida',
    }),
    
});