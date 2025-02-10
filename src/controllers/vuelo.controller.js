import Vuelos from "../models/vuelo.model.js";
import Aviones from "../models/aviones.model.js";


//crear vuelos 
export const createVuelos = async (req, res) => {
    console.log('datos de vuelos recibidos', req.body); 

    try { 
    const {   
        numeroVuelo, 
        aerolinea, 
        origen, 
        destino, 
        fechaSalida, 
        fechaLlegada, 
        asientosDisponibles, 
        estado
    }=  req.body


    const vueloExistente = await Vuelos.findOne({numeroVuelo});
    if (vueloExistente) {
        return res,status(400).json({ message: "el numero de vuelo ya existe"});
    }
     // convuerte las fechas en formato date

    const fechaSalidaISO = fechaSalida ? new Date(fechaSalida) : null;
    const fechaLlegadaISO = fechaLlegada ? new Date(fechaLlegada) : null;
    
    if (isNaN(fechaSalidaISO.getTime()) || isNaN(fechaLlegadaISO.getTime())) {
        return res.status(400).json({message:"fecha no valida"});
    }

    const avion = await  Avion.findById(avionId);
    if(!avion) {
        return res.status(400).json({ message: " el avion seleccionado no existe"});
    }

    // validar la capacidad

    if (asientosDisponibles > avion.capacidad) {
        return res.status(400).jsom({ message:" los asientos disponibles denben ser mayor a la capacidad del avion"});
    }


    const newVuelo  = new Vuelos({
        numeroVuelo, 
        aerolinea, 
        origen, 
        destino, 
        fechaSalida :  fechaSalidaISO, 
        fechaLlegada : fechaLlegadaISO, 
        vueloId,
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
        const vuelos = await Vuelos.find({}, "_id numeroVuelo aerolinea origen destino fechaSalida fechaLlegada asientosDisponibles estado ")
        .populate("avionId", "modelo capacidad");

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
        .populate( "vueloId", "modelo capacidad");

        if(!vuelos) {
            return res.status(400).json({message: "vuelo no encontrado"});
        }
        res.status(200).json(vuelos);
    } catch (error) {
        res.status(500).json({ error: error.message}); 
    }
};

// actualizar vuelo por id

export const updateVuelo = async (req, res) => {
    try {
        const { fechaSalida, fechaLlegada, avionId, asientosDisponibles } = req.body;

        // Si se envían fechas, validarlas
        if (fechaSalida && fechaLlegada) {
            const fechaSalidaISO = new Date(fechaSalida);
            const fechaLlegadaISO = new Date(fechaLlegada);

            if (isNaN(fechaSalidaISO.getTime()) || isNaN(fechaLlegadaISO.getTime())) {
                return res.status(400).json({ message: "Fecha no válida." });
            }
            if (fechaSalidaISO >= fechaLlegadaISO) {
                return res.status(400).json({ message: "La fecha de salida debe ser menor que la de llegada." });
            }
        }

        // Si se envía un nuevo avión, verificar su capacidad
        if (avionId) {
            const avion = await Aviones.findById(avionId);
            if (!avion) {
                return res.status(400).json({ message: "El avión seleccionado no existe." });
            }
            if (asientosDisponibles && asientosDisponibles > avion.capacidad) {
                return res.status(400).json({ message: "Los asientos disponibles no pueden superar la capacidad del avión." });
            }
        }

        const vueloActualizado = await Vuelos.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("avionId", "modelo capacidad");

        if (!vueloActualizado) {
            return res.status(404).json({ message: "Vuelo no encontrado." });
        }

        res.status(200).json(vueloActualizado);

    } catch (error) {
        console.error("Error al actualizar vuelo:", error);
        res.status(500).json({ message: error.message });
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


