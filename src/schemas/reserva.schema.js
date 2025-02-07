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
    estadoReserva: z  
    .string({
        required_error: 'Este campo es requerido',
    }),
    estadoPago: z 
    .string({
        required_error: 'Este campo es requerido',
    }),

});

