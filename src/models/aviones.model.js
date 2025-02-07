import mongoose from "mongoose";


//matricula modelo fabricante capacidad rangoVueloKM fechaFabricacion

const avionesSchema = new mongoose.Schema({
    pasajeroId: {
        type:String,
        ref: "Pasajeros",
        required:true,
    },
    matricula : {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    fabricante: {
        type: String,
        required: true,
    },
    capacidad: {
        type: Number,
        required: true,
    },
    rangoVueloKM: {
        type: Number,
        required: true,
    },
    fechaFabricacion: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Aviones", avionesSchema);
