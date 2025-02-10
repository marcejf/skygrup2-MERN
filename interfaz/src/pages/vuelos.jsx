import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Necesario para usar navigate
import { FaHome, FaCalendar, FaPlane, FaMapMarkedAlt, FaSuitcase, FaFileInvoice, FaTicketAlt, FaTruck, FaClipboardList, FaUser, FaSignOutAlt, FaUsers } from "react-icons/fa"; // Asegúrate de importar los íconos
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useEffect } from "react";



function Vuelos() {
  const { register, handleSubmit, reset } = useForm(); // Necesario para usar useForm
  const [vuelos, setVuelos ] = useState([]); // Estado para guardar los pasajeros
  const [loading, setLoading] = useState(false); // Para mostrar un mensaje de carga
  const [searchQuery, setSearchQuery] =  useState(""); // Para buscar pasajeros
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVuelo, setSelectedVuelo] = useState(null);
  const navigate = useNavigate(); //inicializamos el navigate


  // listar pasajeros
  const fetchVuelos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/getVuelos',{
        withCredentials: true,
      });
      console.log("datos recibidos", response.data);// Muestra los datos recibidos

      setVuelos(response.data);
    } catch (error) {
      console.error("Error al cargar los pasajeros", error);

    } finally {
      setLoading(false);
    }
  };  

  useEffect(() =>{
    fetchVuelos();
  }, []);





  const searchVuelo = async () => {
    if (!searchQuery.trim()) {

      fetchVuelos();
      console.error("El campo de búsqueda está vacío");
      return;
    }
     
    setLoading(true);
  
    try { 
       
      const url = `http://localhost:4000/api/searchVuelo/${encodeURIComponent(searchQuery)}`;
      const response = await axios.get(url, { withCredentials: true });

    const data = Array.isArray(response.data) ? response.data : [response.data];
    setVuelos(data);

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

  const deleteVuelo =async (id) => {
    if(!id) {
      console.error("ID no es valido");
      return;
    }

    const confirmDelete = window.confirm("Esta seguro de eliminar el registro?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/deleteVuelo/${id}`,{
          withCredentials: true,
        });

        setVuelos(vuelos.filter((vuelo) => vuelo._id !== id));
        console.log(`Avion con id: ${id} eliminado`);
      } catch (error) {
        console.error('Error al eliminar avion', error);
      }
    }
  };



  const onSubmit = async (values) => {
    const { numeroVuelo, aerolinea, origen, destino, fechaSalida, fechaLlegada, asientosDisponibles, estado } = values;
  
    if (vuelos.some((vuelo) => vuelo.numeroVuelo === numeroVuelo)) {
      console.error("La matrícula ya está registrada.");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:4000/api/createVuelos", {
        numeroVuelo,
        aerolinea,
        origen,
        destino,
        fechaSalida: new Date(fechaSalida),
        fechaLlegada: new Date(fechaLlegada), // Asegurar formato correcto
        asientosDisponibles: Number(asientosDisponibles),
        estado,

      });

      console.log("Respuesta de la API:", res);
  
      if (res.status === 201) {
        console.log("vuelo creado, receteado con exito")
        setVuelos((prev) => [...prev, res.data]);
        reset();
        fetchVuelos();
      }


    } catch (error) {
      console.error("Error al crear avión", error);
    }
  };


  const handleEditClick = (vuelo) => {
    setSelectedVuelo(vuelo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVuelo(null);
  };

  
  const updateVuelo = async () => {
    if(!selectedVuelo) return;

    try {
        console.log("ID del avión a actualizar:", selectedVuelo._id);
        console.log("Datos enviados:", selectedVuelo);

        const response = await axios.put(
            `http://localhost:4000/api/updateVuelo/${selectedVuelo._id}`,
            selectedVuelo,
            {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            }
        );

        console.log("Avión actualizado", response.data);
        alert("Avión actualizado correctamente");


        closeModal(); // Cierra el modal después de actualizar

        fetchVuelos(); //recarga la lista de vuelos

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
            <FaPlane size={20} className="mr-2" /> Aviones
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
            <FaPlane size={20} className="mr-2" /> Vuelos
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
      <h2 className="text-4xl font-bold text-center p-3 m-3">Registro De vuelos</h2>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="numeroVuelo" className="block text-md ml-2 font-semibold text-white mb-1">Numero vuelo:</label>
            <input type="text" {...register("numeroVuelo", { required: true })}
            className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="aerolinea" className="block text-md ml-2 font-semibold text-white mb-1">Aerolinea</label>
            <input type="text" {...register("aerolinea", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="origen" className="block text-md ml-2 font-semibold text-white mb-1">Origen</label>
            <input type="text" {...register("origen", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="destino" className="block text-md ml-2 font-semibold text-white mb-1">Destino</label>
            <input type="text" {...register("destino", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="fechaSalida" className="block text-md ml-2 font-semibold text-white mb-1">Fecha Salida</label>
            <input type="Date" {...register("fechaSalida", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="fechaLlegada" className="block text-md ml-2 font-semibold text-white mb-1">Fecha Llegada</label>
            <input type="Date" {...register("fechaLlegada", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="asientosDisponibles" className="block text-md ml-2 font-semibold text-white mb-1">Asientos Disponibles</label>
            <input type="Number" {...register("asientosDisponibles", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="estado" className="block text-md ml-2 font-semibold text-white mb-1">Estado</label>
            <input type="text" {...register("estado", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
        </div>
        <div className="space-x-4 mt-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Crear</button>
          <button type="reset" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Borrar</button>
          <button type="button" onClick={fetchVuelos} className="text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 font-medium text-sm py-2.5 px-5 me-2 mb-2">Listar</button>
          <input 
          type="search" 
          placeholder="Buscar pasajero..." 
          value={searchQuery} //valor del campo de busqueda
          onChange={(e) => setSearchQuery(e.target.value)} //funcion que se ejecuta al valor intriducido
          className="w-60 p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg" />
          <button type="button"  onClick={searchVuelo} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Buscar</button>
        </div>
      </form>

      <h2 className="text-2xl font-bold text-center p-6">Listado de vuelos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border-dark-400">
          <thead>
          <tr>
            <th className="px-4 py-2 border-b">Id Vuelo</th>
            <th className="px-4 py-2 border-b">Modelo</th>
            <th className="px-4 py-2 border-b">Capacidad</th>
            <th className="px-4 py-2 border-b">Numero vuelo</th>
            <th className="px-4 py-2 border-b">Aerolinea</th>
            <th className="px-4 py-2 border-b">Origen</th>
            <th className="px-4 py-2 border-b">Destino</th>
            <th className="px-4 py-2 border-b">Fecha Salida</th>
            <th className="px-4 py-2 border-b">Fecha Llegada</th>
            <th className="px-4 py-2 border-b">Asientos Dispo.</th>
            <th className="px-4 py-2 border-b">Estado</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">Cargando...</td>
              </tr>
            ) : vuelos.length > 0 ? (
              vuelos.map((vuelo) => (
                <tr key={vuelo._id} className="border-b">
                  <td className="px-4 py-2">{vuelo._id || "SIN ID"}</td>
                  <td className="px-4 py-2">{vuelo.avionId?.modelo || "N/A"}</td>
                  <td className="px-4 py-2">{vuelo.avionId?.capacidad || "N/A"}</td>
                  <td className="px-4 py-2">{vuelo.numeroVuelo}</td>
                  <td className="px-4 py-2">{vuelo.aerolinea}</td>
                  <td className="px-4 py-2">{vuelo.origen}</td>
                  <td className="px-4 py-2">{vuelo.destino}</td>
                  <td className="px-4 py-2">{vuelo.fechaSalida}</td>
                  <td className="px-4 py-2">{vuelo.fechaLlegada}</td>
                  <td className="px-4 py-2">{vuelo.asientosDiponibles}</td>
                  <td className="px-4 py-2">{vuelo.estado}</td>

                  <td>
                    <button onClick={() => deleteVuelo(vuelo._id)} type="button" className="bg-red-700 p-1 ">Eliminar</button>
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(vuelo)} type="button" className="bg-teal-600 p-1">Editar</button>
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
        {isModalOpen && selectedVuelo&& (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[80vh] overflow-y-auto">            
            <h3 className="text-l font-semibold mb-2 text-black">Editar Vuelo</h3>

              <label className="block mb-2 font-medium text-black">Numero Vuelo:</label>
              <input
                type="text"
                value={selectedVuelo?.numeroVuelo || ""}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, numeroVuelo: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">Aerolinea:</label>
              <input
                type="text"
                value={selectedVuelo.aerolinea}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, aerolinea: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">Origen:</label>
              <input
                type="text"
                value={selectedVuelo?.origen || ""}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, origen: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">Destino:</label>
              <input
                type="text"
                value={selectedVuelo?.destino || ""}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, destino: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">fecha Salida:</label>
              <input
                type="date"
                value={selectedVuelo?.fechaSalida || ""}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, fechaSalida: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />

              <label className="block mb-2 font-medium text-black">fecha Llegada:</label>
              <input
                type="date"
                value={selectedVuelo.fechaLlegada}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, fechaLlegada: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />
              <label className="block mb-2 font-medium text-black">Asientos Dispo..:</label>
              <input
                type="number"
                value={selectedVuelo.asientosDisponibles}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, asientosDisponibles: e.target.value })}
                className="w-full border p-2 rounded mb-4 text-black"
              />
              <label className="block mb-2 font-medium text-black">Estado:</label>
              <input
                type="text"
                value={selectedVuelo.estado}
                onChange={(e) =>
                setSelectedVuelo({ ...selectedVuelo, estado: e.target.value })}
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
                      onClick={updateVuelo}
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

export default Vuelos;
