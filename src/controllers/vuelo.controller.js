import Vuelos from "../models/vuelo.model.js";


//crear vuelos 
export const createVuelos = async (req, res) => {
    console.log('datos de vuelos recibidos', req.body); 

    try { 
    const { 
        pasajeroId,
        numeroVuelo, 
        aerolinea, 
        origen, 
        destino, 
        fechaSalida, 
        fechaLlegada, 
        asientosDisponibles, 
        estado
    }=  req.body

    const fechaSalidaISO = fechaSalida ? new Date(fechaSalida) : null;
    const fechaLlegadaISO = fechaLlegada ? new Date(fechaLlegada) : null;
    
    if (isNaN(fechaSalidaISO.getTime()) || isNaN(fechaLlegadaISO.getTime())) {
        return res.status(400).json({message:"fecha no valida"});
    }
    const newVuelo  = new Vuelos({
        pasajeroId,
        numeroVuelo, 
        aerolinea, 
        origen, 
        destino, 
        fechaSalida :  fechaSalidaISO, 
        fechaLlegada : fechaLlegadaISO, 
        asientosDisponibles, 
        estado
        });
        await newVuelo.save();

        console.log(newVuelo.fechaSalida); // Verifica que sea un objeto Date
        console.log(typeof newVuelo.fechaSalida); // Debería mostrar "object"

        res.status(201).json(newVuelo);

    } catch (error){ 
        res.status(500).json({message: error.message});
    }
};


//listar vuelos
export const getVuelos = async  (req, res) => {
    try {
        const vuelos = await Vuelos.find({}, "_id numeroVuelo aerolinea origen destino fechaSalida fechaLlegada asientosDisponibles estado");

        res.json(vuelos);

    } catch (error) {
        console.error("error al listar vuelos", error);
        res.status(500).json({message: error.message});
    }
};
 
// buscar vuelo por id 
  
export const searchVuelo = async (req, res) => {
    try {
        const vuelos = await Vuelos.findById(req.params.id)
        .populate('pasajeroId');

        if(!vuelos) {
            return res.status(400).json({message: "vuelo no encontrado"});
        }
        res.status(200).json(vuelos);
    } catch (error) {
        res.status(500).json({ error: error.message}); 
    }
};

// actualizar vuelo por id

export const updateVuelo = async (req,res) => {
    try {
        const updateVuelo = await  Vuelos.findByIdAndUpdate(req.params.id, req.body, { new: true});

        if (!updateVuelo) {
            return res.status(400).json({ message:"Vuelo no encontrado"});
        }
        res.status(200).json(updateVuelo);
    }catch (error) {
        res.status(400).json({ error: error.message});
    }
};


// eliminar por id

export const deleteVuelo = async (req, res) => {
    try {
        const deleteVuelo = await Vuelos.findByIdAndDelete(req.params.id);
        if (!deleteVuelo) {
            return res,status(400).json({ message:"Vuelo no encontrado "});
        }
        res.status(200).json({ message: "Vuelo eliminado de manera exitosa"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


