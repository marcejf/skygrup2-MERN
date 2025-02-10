import mongoose from "mongoose";


//matricula modelo fabricante capacidad rangoVueloKM fechaFabricacion

const avionesSchema = new mongoose.Schema({
    pasajeroId: {
        type:String,
        ref: "Pasajeros",
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
        min: 1
    },
    rangoVueloKM: {
        type: Number,
        required: true,
    },
    fechaFabricacion: {
        type: Date,
        required: true
    }
});

export default mongoose.model("Aviones", avionesSchema);
  