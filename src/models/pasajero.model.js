import mongoose from "mongoose";


const pasajerosSchema  =  new mongoose.Schema({
    documento:{
        type:Number,
        required: true,
    },
    nombres:{
        type:String,
        required: true,
    },
    apellidos:{
        type:String,
        required: true,
    },
    pais:{
        type: String,
        required: true,
    },
    edad: {
        type:Number,
        required: true,
    },
    telefono: {
        type:Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'por favor ingresa un email válido']
    },

    createdAT: { type:Date, default:Date.now }, //fecha de creaccion de un documento se genera automaticamentee
    updatedAt: { type:Date } //fecha de actualizacion 

});
// midleware que actualiza 'update' antes de modificar un documento
pasajerosSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt : new Date() }); //fecha actualizada modificada 
    next();
});



export  default mongoose.model("Pasajeros", pasajerosSchema);