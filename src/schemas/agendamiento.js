import { z } from "zod";
    
export const agendamientoSchema= z.object({
  vueloId: z
  .string({
    required_error:"re sequiere el id del pasajero"
  }),
 pasajeroId : z 
  .string({
    required_error: " se requiere el id del vuelo"
  }),
  estado: z 
  .string({
    required_error: "se requiere el estado del agendamiento"
  }),
  fechaAgendamiento: z 
  .string({
    required_error:"se require la fecha de agendamiento"
  }),

});

