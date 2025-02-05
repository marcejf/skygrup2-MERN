import  Pasajeros from  "../models/pasajero.model.js";
//crear clientes, eliminarlo, borrarlo , actualizarlo 



//http://localhost:4000/api/createPasajeros
export const createPasajeros = async (req, res) => {
    try { 
    const { documento, nombres, apellidos, pais, edad, telefono, email}=  req.body
    const newPasajero  = new Pasajeros({
        documento, 
        nombres, 
        apellidos, 
        pais, 
        edad, 
        telefono, 
        email
        });
        await newPasajero.save();
        res.json(newPasajero);

    } catch (error){ 
        res.status(500).json({message: error.message});
    }
};


//http://localhost:4000/api/getPasajeros

export const getPasajeros = async (req, res) => {
    try{
        const pasajeros = await Pasajeros.find({}, "_id documento nombres apellidos pais edad telefono email");
        console.log("pasajeros enviados:", pasajeros);
        
        res.json(pasajeros);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

//actualizar pasajeros 
//http://localhost:4000/api/updatePasajero/:id

export const updatePasajero = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID desde la URL
        const { documento, nombres, apellidos, pais, edad, telefono, email } = req.body; // Datos a actualizar

        const pasajeroActualizado = await Pasajeros.findByIdAndUpdate(
            id, // ID del pasajero
            { documento, nombres, apellidos, pais, edad, telefono, email }, // Nuevos datos
            { new: true, runValidators: true } // Opciones: devuelve el objeto actualizado y valida los datos
        );

        if (!pasajeroActualizado) {
            return res.status(404).json({ message: "Pasajero no encontrado" });
        }

        res.json(pasajeroActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//eliminar pasajero 
//http://localhost:4000/api/deletePasajero/:id

export const deletePasajero = async (req, res) => {
    try {
        const { id } = req.params;  // obtienen  el id del pasajerod 
        
        // buscar y eliminar el pasajero por Id 
        const pasajaroEliminado = await Pasajeros.findByIdAndDelete(id);
        
        if (!pasajaroEliminado) {
            return res.status(400).json({ message: "pasajero no encontrado"});
        }

        res.json({ message: "se elimino correctamente el pasajero", pasajaroEliminado});

    } catch (error) {
        res.status(500).json({  message: error.message});
    }
};

//buscar pasajero por nombre, id o correo (emaill)


//http://localhost:4000/api/buscarPasajero?nombres= 'elnombre'
//http://localhost:4000/api/buscarPasajero?email= 'email'
//http://localhost:4000/api/buscarPasajero?id= 'el id


//uso let por la variacion de las busquedas 
export const buscarPasajero = async (req, res) => {
    
    try{
        const { id, email, nombres} = req.query; //parametros
        //prueba 1
        console.log("datos recibidos", nombres);


        let query = {};

        if (id) {
            query._id = id; //bussco por id 

        } else if (email) {
            query.email = email; //busco por correo

        }else if (nombres){
            query.nombres = {$regex: new RegExp(nombres, "i")} //busco po rnombre y no hay problema con mayusculas o minusculas 
        
        }else {
            return res.status(400).json({ message: "por favor ingresa el ID o el Email o el nombre "});
        }

        const pasajero = await Pasajeros.findOne(query); //busco pasajero

        if (!pasajero) {
            return res.status(400).json({ message: "El pasajero no ha sido encontrado"});
        }

        res.json(pasajero); //retorna el pasajero

    } catch (error) {
        res.status( 500).json({message: error.message});
    }
};