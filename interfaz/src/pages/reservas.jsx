import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Necesario para usar navigate
import { FaHome, FaPlane,FaCalendar ,  FaMapMarkedAlt, FaSuitcase, FaFileInvoice, FaTicketAlt, FaTruck, FaClipboardList, FaUser, FaSignOutAlt, FaUsers } from "react-icons/fa"; // Asegúrate de importar los íconos
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useEffect } from "react";



function Reservas() {
  const { register, handleSubmit, reset } = useForm(); // Necesario para usar useForm
  const [reserva, setReserva ] = useState([]); // Estado para guardar los pasajeros
  const [loading, setLoading] = useState(false); // Para mostrar un mensaje de carga
  const [searchQuery, setSearchQuery] =  useState(""); // Para buscar pasajeros
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const navigate = useNavigate(); //inicializamos el navigate


  // listar pasajeros
  const fetchReserva = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/obtenerReservas',{
        withCredentials: true,
      });
      console.log("datos recibidos", response.data);// Muestra los datos recibidos

      setReserva(response.data);
    } catch (error) {
      console.error("Error al cargar los pasajeros", error);

    } finally {
      setLoading(false);
    }
  };  

  useEffect(() =>{
    fetchReserva();
  }, []);





  const searchReserva = async () => {
    if (!searchQuery.trim()) {

      fetchReserva();
      console.error("El campo de búsqueda está vacío");
      return;
    }
  
    setLoading(true);
  
    try { 
       
      const url = `http://localhost:4000/api/obtenerReserva/${encodeURIComponent(searchQuery)}`;
      const response = await axios.get(url, { withCredentials: true });

    const data = Array.isArray(response.data) ? response.data : [response.data];
    setReserva(data);

    console.log("Datos actualizados", data);
  } catch (error) {
    console.error("Error al buscar avión", error);
    if (error.response) {
      console.error("Detalles del error", error.response.data);
    }
  } finally {
    setLoading(false);
  }
};

  const deleteReserva =async (id) => {
    if(!id) {
      console.error("ID no es valido");
      return;
    }

    const confirmDelete = window.confirm("Esta seguro de eliminar el registro?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/eliminarReserva/${id}`,{
          withCredentials: true,
        });

        setReserva(reserva.filter((reserva) => reserva._id !== id));
        console.log(`Avion con id: ${id} eliminado`);
      } catch (error) {
        console.error('Error al eliminar avion', error);
      }
    }
  };



  const onSubmit = async (values) => {
    const { vueloId, pasajeroId,  numAsiento, fechaReserva, estadoPago } = values;
  
    if (reserva.some((reserva) => reserva.vueloId === vueloId)) {
      console.error("La matrícula ya está registrada.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/crearReserva", {
        vueloId,
        pasajeroId,
        numAsiento:Number(numAsiento),
        fechaReserva:new Date(fechaReserva),
        estadoPago,

      });

      console.log("Respuesta de la API:", res);
  
      if (res.status === 201) {
        console.log("vuelo creado, receteado con exito")
        setReserva((prev) => [...prev, res.data]);
        reset();
        fetchReserva();
      }


    } catch (error) {
      console.error("Error al crear avión", error);
    }
  };


  const handleEditClick = (vuelo) => {
    setSelectedReserva(vuelo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReserva(null);
  };

  
  const updateReserva = async () => {
    if(!selectedReserva) return;

    try {
        console.log("ID del avión a actualizar:", selectedReserva._id);
        console.log("Datos enviados:", selectedReserva);

        const response = await axios.put(
            `http://localhost:4000/api/actualizarReserva/${selectedReserva._id}`,
            selectedReserva,
            {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            }
        );

        console.log("Avión actualizado", response.data);
        alert("Avión actualizado correctamente");


        closeModal(); // Cierra el modal después de actualizar

        fetchReserva(); //recarga la lista de vuelos

    } catch (error) {
        console.error("Error al actualizar avión", error);
        if (error.response) {
            console.error("Detalle del error", error.response.data);
        }
    }
};



  return (
    <div>
      <nav className="bg-blue-100 text-black py-4 px-3 shadow-md">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 overflow-x-auto">
        <span onClick={() => navigate("/home")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaHome size={20} className="mr-2" /> Home
          </span>
          <span onClick={() => navigate("/agenda")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaCalendar size={20} className="mr-2" /> Agenda
          </span>
          <span onClick={() => navigate("/aviones")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaPlane size={20} className="mr-2" /> aviones
          </span>
          
          <span onClick={() => navigate("/equipajes")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaSuitcase size={20} className="mr-2" /> Equipajes
          </span>
          <span onClick={() => navigate("/facturas")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaFileInvoice size={20} className="mr-2" /> Facturas
          </span>
          <span onClick={() => navigate("/CreatePasajero")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaMapMarkedAlt size={20} className="mr-2" /> Pasajeros
          </span>
          <span onClick={() => navigate("/pasajes")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaTicketAlt size={20} className="mr-2" /> Pasajes
          </span>
          <span onClick={() => navigate("/proveedores")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaTruck size={20} className="mr-2" /> Proveedores
          </span>
          <span onClick={() => navigate("/reservas")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaClipboardList size={20} className="mr-2" /> Reservas
          </span>
          <span onClick={() => navigate("/vuelos")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaClipboardList size={20} className="mr-2" /> Vuelos
          </span>

          {/* Menú desplegable con Headless UI */}
          <Menu as="div" className=" flex-auto left-0 right-auto ">
            <Menu.Button className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
              <FaUser size={20} className="mr-2" /> Empleados
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-auto rigth-0 mt-2 w-56 bg-white text-black shadow-lg rounded-md z-50 flex flex-col">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/empleados")}
                      className={`flex items-center w-full px-4 py-2 ${active ? "bg-gray-200" : ""}`}>
                      <FaUsers className="mr-2" /> Empleados
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/usuarios")}
                      className={`flex items-center w-full px-4 py-2 text-black ${active ? "bg-gray-200" : ""}`}>
                      <FaUser className="mr-2" /> Usuarios
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/Login")}
                      className={`flex items-center w-full px-4 py-2 text-black ${active ? "bg-gray-200" : ""}`}>
                      <FaSignOutAlt className="mr-2" /> Cerrar Sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>

      <h1 className="text-4xl font-bold text-center p-9">AEROLÍNEA2 SKYGRUP MERN</h1>
      <h2 className="text-4xl font-bold text-center p-3 m-3">Registro De Reservas</h2>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="vueloId" className="block text-md ml-2 font-semibold text-white mb-1">Vuelo ID:</label>
            <input type="text" {...register("vueloId", { required: true })}
            className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="pasajeroId" className="block text-md ml-2 font-semibold text-white mb-1">pasajero ID </label>
            <input type="Text" {...register("pasajeroId", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="numAsiento" className="block text-md ml-2 font-semibold text-white mb-1">num Asiento</label>
            <input type="number" {...register("numAsiento", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="fechaReserva" className="block text-md ml-2 font-semibold text-white mb-1">Fecha Reserva</label>
            <input type="Date" {...register("fechaReserva", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="estadoPago" className="block text-md ml-2 font-semibold text-white mb-1">Estado de Pago</label>
            <input type="Text" {...register("estadoPago", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          
        </div>
        <div className="space-x-4 mt-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Crear</button>
          <button type="reset" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Borrar</button>
          <button type="button" onClick={fetchReserva} className="text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 font-medium text-sm py-2.5 px-5 me-2 mb-2">Listar</button>
          <input 
          type="search" 
          placeholder="Buscar Reserva.." 
          value={searchQuery} //valor del campo de busqueda
          onChange={(e) => setSearchQuery(e.target.value)} //funcion que se ejecuta al valor intriducido
          className="w-60 p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg" />
          <button type="button"  onClick={searchReserva} className="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Buscar</button>
        </div>
      </form>

      <h2 className="text-2xl font-bold text-center p-6">Listado de Reservas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border-dark-400">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Id Reserva</th>
              <th className="px-4 py-2 border-b">pasajeros</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Telefono</th>
              <th className="px-4 py-2 border-b">Vuelo Origen</th>
              <th className="px-4 py-2 border-b">Vuelo Destino</th>
              <th className="px-4 py-2 border-b">fecha de vuelo</th>
              <th className="px-4 py-2 border-b">Asiento</th>
              <th className="px-4 py-2 border-b">Fecha Reserva</th>
              <th className="px-4 py-2 border-b">Estado Pago</th>
              <th className="">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">Cargando...</td>
              </tr>
            ) : reserva.length > 0 ? (
              reserva.map((reserva) => (
                <tr key={reserva._id} className="border-b">
               <td className="px-4 py-2">{reserva._id || "SIN ID"}</td>
                <td className=" px-4 py-2 whitespace-nowrap">
                  {reserva.pasajeroId?.nombres} {reserva.pasajeroId?.apellidos}
                </td>
                  <td className="px-4 py-2">{reserva.pasajeroId?.email}</td>
                  <td className="px-4 py-2">{reserva.pasajeroId?.telefono}</td>
                  <td className="px-4 py-2">{reserva.vueloId?.origen}</td>
                  <td className="px-4 py-2">{reserva.vueloId?.destino}</td>
                  <td className="px-4 py-2">
                    {reserva.vueloId?.fechaSalida? new Date(reserva.vueloId.fechaSalida).toLocaleDateString() : "Sin fecha"}
                  </td>
                  <td className="px-4 py-2">{reserva.numAsiento}</td>
                  <td className=" px-4 py-2">
                    {new Date(reserva.fechaReserva).toLocaleDateString()}
                  </td>
                  <td className={`px-4 py-2 ${
                    reserva.estadoPago === "Pagado" ? "text-green-600 font-bold" : "text-red-600 font-bold"}`}>
                    {reserva.estadoPago}
                  </td>
                  <td>
                    <button onClick={() => deleteReserva(reserva._id)} type="button" className="bg-red-700 p-1 ">Eliminar</button>
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(reserva)} type="button" className="bg-teal-600 p-1">Editar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">No se encontraron Vuelos</td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && selectedReserva&& (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[80vh] overflow-y-auto">            
            <h3 className="text-l font-semibold mb-2 text-black">Editar Reservas </h3>

              <label className="block mb-2 font-medium text-black">ID Pasajero:</label>
              <input
                type="text"
                value={selectedReserva?.pasajeroId || ""}
                onChange={(e) =>
                setSelectedReserva({ ...selectedReserva, pasajeroId: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">Id vuelo</label>
              <input
                type="text"
                value={selectedReserva.vueloId}
                onChange={(e) =>
                setSelectedReserva({ ...selectedReserva, vueloId: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">num Asiento:</label>
              <input
                type="number"
                value={selectedReserva?.numAsiento|| ""}
                onChange={(e) =>
                setSelectedReserva({ ...selectedReserva, numAsiento: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">Fecha Reserva:</label>
              <input
                type="date"
                value={selectedReserva?.fechaReserva || ""}
                onChange={(e) =>
                setSelectedReserva({ ...selectedReserva, fechaReserva: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">Estador Pago:</label>
              <input
                type="date"
                value={selectedReserva?.estadoPago|| ""}
                onChange={(e) =>
                setSelectedReserva({ ...selectedReserva, estadoPago: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <div className="flex justify-end space-x-3">
                  <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                  >
                      Cancelar
                  </button>
                  <button
                      onClick={updateReserva}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                      Guardar Cambios
                  </button>
              </div>
          </div>
      </div>
        )}
      </div>
    </div>
  );
}

export default Reservas;
