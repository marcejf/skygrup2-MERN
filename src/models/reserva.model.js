import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
    {
        pasajeroId : {
            type: String,    
            ref:"Pasajeros",
            required:true,
        },     
        vueloId : {
            type:String,
            ref:"Vuelos",
            required:true,
        },
        numAsiento : {
            type : Number,
            required:true,
        },
        fechaReserva : {
            type:Date,
        },
        
        estadoPago: {
            type: String,
            required: true,
        },
    },
);

const Reserva = mongoose.model("Reserva", reservaSchema);

export default Reserva;