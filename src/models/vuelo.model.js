import mongoose from "mongoose";
 

const vuelosSchema = new mongoose.Schema({
    pasajeroId: {
        type: String, 
        ref: "Pasajeros",
        required: true,
    },  
    /* empleadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Empleados",
        required: true,
    }, 
    equipaje: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipaje",
        required: true,
    }, */
    numeroVuelo : {
        type: String,
        required: true,
    },
    aerolinea: {
        type: String,
        required: true,
    },
    origen: {
        type: String,
        required: true,
    },
    destino: {
        type: String,
        required: true,
    },
    fechaSalida: {
        type: Date,
        required: true,
    },
    fechaLlegada: {
        type: Date,
        required: true,
    },
    asientosDisponibles: {
        type:Number,
        required: true,
    },
    estado: {
        type:String,
        required: true,
    }
});



 const Vuelos = mongoose.model("Vuelos", vuelosSchema);
 
 export default Vuelos;