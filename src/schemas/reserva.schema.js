import { z } from "zod";

export const createReservaSchema = z.object(
    {    
    pasajeroId: z
    .string({
        required_error:'El id del pasajero es requerido',
    }),
    vueloId: z  
    .string({
        required_error: 'El id del vuelo es requerido', 
    }),
    numAsiento: z 
    .number({     
        required_error: 'Este campo es requerido',
    }),
    fechaReserva: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
            return new Date(arg);
        }
        return arg;
    }, z.date({ required_error: 'La fecha de reserva es requerida' })),
    
    estadoPago: z 
    .string({
        required_error: 'Este campo es requerido',
    }),

});

