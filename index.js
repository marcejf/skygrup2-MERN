import app from "./src/app.js";
import { connectDB } from "./src/dbs.js";
import {PORT} from "./src/config.js"


async function main() {
    try{
        await connectDB();
        app.listen(PORT, ()=> {
            console.log(`el servidor esta escuchando en el puerto: http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('fallo la conexion');
    }
}

connectDB(); //inicializa la base de datos

main(); //inicia el servidor



