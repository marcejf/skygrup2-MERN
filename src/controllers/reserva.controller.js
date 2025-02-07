import Reserva from "../models/reserva.model.js";   

//crear reserva  

export const crearReserva = async (req, res) => {
    try {
        const {pasajeroId, vueloId, numAsiento, estadoReserva, estadoPago,} = req.body;


        const nuevaReserva = new Reserva({
            pasajeroId,
            vueloId,
            numAsiento,
            estadoReserva,
            estadoPago,
        });

        const reservaGuardada = await nuevaReserva.save();
        res.status(201).json(reservaGuardada);

    } catch (error) {
        res.status(500).json({message: "Error al cresr reserva", error});
    }
};

//listar reservas 

export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate("pasajeroId vueloId");  
        res.json(reservas);

    } catch (error) {
        console.error("error al listar reservas", error);
        res.status(500).json({message: "Error al listar Reservas", error});
    }
};



//buscar reserva por id 
 
export const obtenerReservaById = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id).populate("pasajeroId vueloId");
        if (!reserva) return res.status(404).json ({message: "No se Encontro la reserva"});

        res.json(reserva);
    }catch (error) {
        res.status(500).json({message: "Error al buscar reserva por id",error })
    }
};


//actualizar reserva 
export const actualizarReserva = async (req, res) => {
   try {

    const { id } = req.params; //obten el id se la url

    const updateReserva = await Reserva.findByIdAndUpdate(
        id, //id de la reserva
        req.body, //los datos a actualizarr
        {new: true, runValidators: true } //devuelve el documento actualizados  y runvalidatos hace que s ejecute
    );

    if (!updateReserva) {
        return res.status(400).json({ message: "Reserva no encontrada"});
    }

    res.json(updateReserva); //devuelve la reserva actualizada

   } catch (error) {
    console.error("error al actualizar reserva", error);

    res.status(500).json({message : "Error al actualizar la reserva", error: error.message});
   }
};


//eliminar reserva por id 

export const eliminarReserva = async (req, res) => {
   try {
    const {id } = req.params; 
    const reservaEliminada = await Reserva.findByIdAndDelete(id);

    if (!reservaEliminada) {
        return res.status(404).json({ message: "Reserva no encontrada"});
    }

    res.json({ message: "Reserva eliminada con exito"});
   } catch (error) {
    console.error("Error al eliminar reserva", error);
    res.status(500).json({ message:"error al eliminar reserva", error: error.message});
   }
};


