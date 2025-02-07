import { z } from "zod";  

export const createVuelosSchema = z.object({
    pasajeroId: z
    .string({
        required_error:'El id del pasajero es requerido',  
    }),
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
    //z.preprocess modifica el zood para convertor el string  a date
    fechaSalida: z.preprocess((arg) => {
        // Si el argumento es una cadena o un Date, se transforma a Date
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
    }),
    estado : z
    .string({
        required_error: 'el estado del vuelo es requerido'
    }),

});


