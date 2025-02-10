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
    
    fechaFabricacion:z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val), // Convertir string a Date
        z.date({ required_error: "El año de fabricación del avión es requerido" })
    ),
    capacidad: z
    .number({
        required_error: 'la capacidad del avion es requerido',
        }).int("la capacidad debe ser un numero entero")
        .positive("la capacidad debe ser mayor a 0 "),
    });

    rangoVueloKM: z 
    .number({
        required_error: 'lel rango de vuelo del avion es requerida',
   
    
});