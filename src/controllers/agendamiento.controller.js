import Agendamiento from "../models/agendamiento.js ";

//  Crear un nuevo agendamiento
export const crearAgendamiento = async (req, res) => {
  try {
    

    const {vueloId, pasajeroId, estado,   FechaAgendamiento} = req.body;
    const agendamiento = new Agendamiento({
      vueloId,
      pasajeroId,
      estado,
      FechaAgendamiento
    });

    const agendamientoGuardada = await agendamiento.save();
    res.status(201).json(agendamientoGuardada);
  }catch (error) {
    res.status(500)({ message: "error al crear agendamiento"});
  }
    
};

//  Obtener todos los agendamientos
export const obtenerAgendamientos = async (req, res) => {
  try {
    const agendamientos = await Agendamiento.find()
    .populate("vueloId pasajeroId");

    res.status(200).json(agendamientos);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener los agendamientos" });
  }
};

//  Obtener un agendamiento por ID
export const obtenerAgendamientoPorId = async (req, res) => {
  try {
    const agendamiento = await Agendamiento.findById(req.params.id).populate({
      path: "vueloId",
      select: "estado asientosDisponibles  fecha salida " // Solo trae estado y asientos disponibles del vuelo
    })
    .populate({
      path: "pasajeroId",
      select: "nombres  apellidos  email" // Solo trae nombres y email del pasajero
    });
    if (!agendamiento) {
      return res.status(404).json({ error: "Agendamiento no encontrado" });
    }
    res.status(200).json(agendamiento);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el agendamiento" });
  }
};

//  Actualizar un agendamiento por ID
export const actualizarAgendamiento = async (req, res) => {
   try {

    const { id } = req.params; //obten el id se la url

    const updateAgendamiento = await Reserva.findByIdAndUpdate(
        id, //id de la reserva
        req.body, //los datos a actualizarr
        {new: true, runValidators: true } //devuelve el documento actualizados  y runvalidatos hace que s ejecute
    );

    if (!updateAgendamiento) {
        return res.status(400).json({ message: "agendamiento no encontrada"});
    }

    res.json(updateAgendamiento); //devuelve la reserva actualizada

   } catch (error) {
    console.error("error al actualizar reserva", error);

    res.status(500).json({message : "Error al actualizar agendamiento", error: error.message});
   }
};

// Eliminar un agendamiento por ID
export const eliminarAgendamiento = async (req, res) => {
  try {
   const {id } = req.params; 
   const agendamientoEliminada = await Reserva.findByIdAndDelete(id);

   if (!agendamientoEliminada) {
       return res.status(404).json({ message: "Reserva no encontrada"});
   }

   res.json({ message: "Reserva eliminada con exito"});
  } catch (error) {
   console.error("Error al eliminar reserva", error);
   res.status(500).json({ message:"error al eliminar reserva", error: error.message});
  }
};