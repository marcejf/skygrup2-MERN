 import mongoose from "mongoose";


// squema para enviar datos 
const UserSquema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'por favor ingresa un email válido']
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required: true,
        enum:['admin', 'user', 'user1'],
        default: "user"
    },

});  

export default mongoose.model("User", UserSquema);// se va a llamar user 