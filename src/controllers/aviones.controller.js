import Aviones from "../models/aviones.model.js";

//matricula modelo fabricante capacidad rangoVueloKM fechaFabricacion

//crear 
export const createAviones = async (req, res) => {
    try { 
    const {  pasajeroId, matricula, modelo, fabricante, capacidad, rangoVueloKM, fechaFabricacion, estado }=  req.body
    const newAvion  = new Aviones({
        pasajeroId,
        matricula, 
        modelo, 
        fabricante, 
        capacidad, 
        rangoVueloKM,  
        fechaFabricacion, 
        estado
        });
        await newAvion.save();
        res.json(newAvion);

    } catch (error){ 
        res.status(500).json({message: error.message});
    }
};


//listar 
export const getAviones = async  (req, res) => {  
    try {
        const aviones = await Aviones.find({}, "_id matricula modelo fabricante capacidad rangoVueloKM fechaFabricacion");
        console.log("datos de Aviones recibidos", aviones);

        res.json(aviones);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}; 
 
// buscar vuelo por id 
//despues EmpleadoId equipajeId
export const searchAvion = async (req, res) => {
    try {
        const aviones = await Aviones.findById(req.params.id)
        .populate("pasajeroId");

        if(!aviones) {
            return res.status(400).json({message: "avion no encontrado"});
        }
        res.status(200).json(aviones);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

// actualizar vuelo por id

export const updateAvion = async (req,res) => {
    try {
        const updateAvion = await  Aviones.findByIdAndUpdate(req.params.id, req.body, { new: true});
 
        if (!updateAvion) {
            return res.status(400).json({ message:"Avion no encontrado"});
        }
        res.status(200).json(updateAvion);
    }catch (error) {
        res.status(400).json({ error: error.message});
    }
};


// eliminar por id

export const deleteAvion = async (req, res) => {
    try {
        const deleteAvion = await Aviones.findByIdAndDelete(req.params.id);
        if (!deleteAvion) {
            return res.status(400).json({ message:"Avion no encontrado "});
        }
        res.status(200).json({ message: "Avion eliminado de manera exitosa"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


