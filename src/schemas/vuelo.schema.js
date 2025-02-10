import { z } from "zod";  

export const createVuelosSchema = z.object({
    
    numeroVuelo: z
    .string({
        required_error:'El numero de vuelo es requerido',  
    }),
    aerolinea: z
    .string({
         required_error: 'La aerolinea es requerida',
    }),
    origen: z
    .string({
        required_error:'el origen del vuelo es requerido',
    }),
    destino: z
    .string({
        required_error: 'el destino del vuelo es requerido',
    }),

    fechaSalida: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
            return new Date(arg);
        }
        return arg;
    }, z.date({ required_error: 'La fecha de salida es requerida' })),

    fechaLlegada: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
            return new Date(arg);
        }
        return arg;
    }, z.date({ required_error: 'La fecha de llegada es requerida' })),

   

    asientosDisponibles: z 
    .number({
        required_error: 'campo de asientos disponibles es requeriod',
    }).min(1, "debe haber almenos 1 asiento disponible "),

    avionId: z
    .string({
        required_error:"el ID del avion es requerido"
    }),
    
    estado : z.enum(["agendado", "en curso", "finalizado", "cancelado"],{
        required_error: 'el estado del vuelo es requerido',
    }),
});
