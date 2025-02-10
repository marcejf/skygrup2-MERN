import mongoose from "mongoose";

const agendamientoSchema = new mongoose.Schema({
  vueloId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vuelos",
    required: true,
  },   
  pasajeroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasajeros",
    required: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "confirmado", "cancelado"],
    default: "pendiente",
  },
  fechaAgendamiento: {
    type: Date,
    default: Date.now,
  },
});

const Agendamiento = mongoose.model("Agendamiento", agendamientoSchema);


export default Agendamiento;

     