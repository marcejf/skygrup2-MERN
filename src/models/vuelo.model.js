import mongoose from "mongoose";
 

const vuelosSchema = new mongoose.Schema({
     
    numeroVuelo : {
        type: String,
        required: true,
        unique: true,  //para que no se duplique el numero de vuelo
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

    avionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aviones",
        required: true,
    },
    
    asientosDisponibles: {
        type:Number,
        required: true,
        min: [1, "El número de asientos debe ser mayor que 0"],
        validator: async function (value) {
            const Avion = mongoose.model("Aviones");
            const avion = await Avion.findById(this.avionId);
            return avion && value <= avion.capacidad;
        },
        message:"los asientos disponibles no pueden superar la capacidad del avion"
    },
    estado: {
        type:String,
        enum:["agendado", "en curso", "finalizado", "cancelado"],
        required: true,
        default:"agendado",
    },
  },
  {timestamps: true } //agrega automaticamente create  y upsate
);



 const Vuelos = mongoose.model("Vuelos", vuelosSchema);
 
 export default Vuelos;