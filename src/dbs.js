import mongoose from "mongoose";
import {MONGODB_URI} from  "./config.js"



export const connectDB = async () => {

    try{
        await mongoose.connect(MONGODB_URI); // esta url permite conectar a la base de datos de mongo
        console.log('mongoDB conectado');


    }catch(error){
        console.error('mongoDB no se pudo conectar');
        process.exit(1);
    }
};
  
