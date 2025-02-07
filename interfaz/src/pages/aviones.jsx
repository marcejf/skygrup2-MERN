import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Necesario para usar navigate
import { FaHome, FaPlane, FaMapMarkedAlt, FaSuitcase, FaFileInvoice, FaTicketAlt, FaTruck, FaClipboardList, FaUser, FaSignOutAlt, FaUsers } from "react-icons/fa"; // Asegúrate de importar los íconos
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";


function Aviones() {
  const { register, handleSubmit, reset } = useForm(); // Necesario para usar useForm
  const [aviones, setAviones ] = useState([]); // Estado para guardar los pasajeros
  const [loading, setLoading] = useState(false); // Para mostrar un mensaje de carga
  const [searchQuery, setSearchQuery] = useState(""); // Para buscar pasajeros
  const navigate = useNavigate(); //inicializamos el navigate


  // listar pasajeros
  const fetchAviones = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/getAviones',{
        withCredentials: true,
      });
      console.log("datos recibidos", response.data);// Muestra los datos recibidos

      setAviones(response.data);
    } catch (error) {
      console.error("Error al cargar los pasajeros", error);

    } finally {
      setLoading(false);
    }
  };  

  const searchAvion = async () => {
    if (!searchQuery || searchQuery.trim() === "") {
      console.error("El campo de búsqueda está vacío");
      return;
    }
  
    setLoading(true);
  
    try {
      let param;
      if (searchQuery.includes('')) {
        param = 'id';
      } else if (!isNaN(searchQuery)) {
        param = 'matricula';
      } 

      
      const url = `http://localhost:4000/api/searchAvion?${param}=${encodeURIComponent(searchQuery)}`;
      
      const response = await axios.get(url, { withCredentials: true });
      console.log("Datos recibidos de la API", response.data);
  
      // Asegurar que la respuesta siempre sea un array antes de asignarla a setPasajeros
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setAviones(data);
      
      console.log("Estado deAviones actualizado", data);
    } catch (error) {
      console.error("Error al buscar avion", error);
      if (error.response) {
        console.error("Detalles del error", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteAvion =async (id) => {
    if(!id) {
      console.error("ID no es valido");
      return;
    }

    const confirmDelete = window.confirm("Esta seguro de eliminar el registro?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/deleteAvion/${id}`,{
          withCredentials: true,
        });

        setAviones(aviones.filter((avion) => avion._id !== id));
        console.log(`Avion con id: ${id} eliminado`);
      } catch (error) {
        console.error('Error al eliminar avion', error);
      }
    }
  };

  const updateAvion = async (id, updateData) => {
    try{
      const response = await axios.put(
        `http://localhost:4000/api/updateAvion/${id}`,
      updateData,{withCredentials:true,}      
      );

    console.log("avion actualizado", response.data);

    setAviones((prevAviones) => 
    prevAviones.map((avion) => 
    avion._id === id ? {...avion, ...updateData} : avion
  )
  );

  }catch (error) {
    console.error("Error al actulizar pasajero", error);
    if (error.response) {
      console.error("detalle del error", error.response.data);
    }
  }
  };

  


  const onSubmit = async (values) => {
    const capacidad= Number(values.capacidad);
    const rangoVueloKM = Number(values.rangoVueloKM);
    const fechaFabricacion = Number(values.fechaFabricacion);

    if (aviones.some((avion) => avion.modelo === modelo)) {
      console.error("El documento ya está registrado.");
      return;
    }

    if (isNaN(capacidad) || isNaN(rangoVueloKM) || isNaN(fechaFabricacion)) {
      console.error("Recuerda ingresar correctamente los campos numéricos");
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/createAviones', {
        ...values,
        capacidad,
        rangoVueloKM,
        fechaFabricacion
      });

      if (res.status === 200) {
        setAviones((prev) => [...prev, res.data]);
        reset();
      }
    } catch (error) {
      console.error("Error al crear avion", error);
    }
  };

  return (
    <div>
      <nav className="bg-blue-100 text-black py-4 px-3 shadow-md">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 overflow-x-auto">
        <span onClick={() => navigate("/home")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaHome size={20} className="mr-2" /> Home
          </span>
          <span onClick={() => navigate("/aviones")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaPlane size={20} className="mr-2" /> Aviones
          </span>
          <span onClick={() => navigate("/aeropuertos")} className="flex items-center cursor-pointer hover:text-blue-950 transition-colors">
            <FaMapMarkedAlt size={20} className="mr-2" /> Aeropuertos
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
      <h2 className="text-4xl font-bold text-center p-3">Registrar Pasajero</h2>
      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Formulario para crear pasajero */}
          <div>
            <label htmlFor="matricula" className="block text-md ml-2 font-semibold text-gray-700 mb-1">matricula:</label>
            <input type="text" {...register("matricula", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="modelo" className="block text-md ml-2 font-semibold text-white mb-1">Modelo</label>
            <input type="text" {...register("modelo", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="fabricante" className="block text-md ml-2 font-semibold text-white mb-1">fabricante</label>
            <input type="text" {...register("fabricante", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="capacidad" className="block text-md ml-2 font-semibold text-white mb-1">capacidad</label>
            <input type="Number" {...register("capacidad", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="rangoVueloKM" className="block text-md ml-2 font-semibold text-white mb-1">Rango Vuelo KM</label>
            <input type="Number" {...register("rangoVueloKM", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="fechaFabricacion" className="block text-md ml-2 font-semibold text-white mb-1">Fecha Fabicacion</label>
            <input type="Number" {...register("fechaFabricacion", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
        </div>
        <div className="space-x-4 mt-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Crear</button>
          <button type="reset" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Borrar</button>
          <button type="button" onClick={fetchPasajeros} className="text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 font-medium text-sm py-2.5 px-5 me-2 mb-2">Listar</button>
          <input 
          type="search" 
          placeholder="Buscar pasajero..." 
          value={searchQuery} //valor del campo de busqueda
          onChange={(e) => setSearchQuery(e.target.value)} //funcion que se ejecuta al valor intriducido
          className="w-60 p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg" />
          <button type="button"  onClick={searchPasajero} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Buscar</button>
        </div>
      </form>

      <h2 className="text-2xl font-bold text-center p-6">Listado de Pasajeros</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border-dark-400">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">id</th>
              <th className="px-4 py-2 border-b">matricula</th>
              <th className="px-4 py-2 border-b">modelo</th>
              <th className="px-4 py-2 border-b">fabricante</th>
              <th className="px-4 py-2 border-b">capacidad</th>
              <th className="px-4 py-2 border-b">rangoVueloKM</th>
              <th className="px-4 py-2 border-b">fecgaFabricacion</th>
              <th className="">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">Cargando...</td>
              </tr>
            ) : aviones.length > 0 ? (
              aviones.map((avion) => (
                <tr key={avion._id} className="border-b">
                  <td className="px-4 py-2">{avion._id || "SIN ID"}</td>
                  <td className="px-4 py-2">{avion.matricula}</td>
                  <td className="px-4 py-2">{avion.modelo}</td>
                  <td className="px-4 py-2">{avion.fabricante}</td>
                  <td className="px-4 py-2">{avion.capacidad}</td>
                  <td className="px-4 py-2">{avion.rangoVueloKM}</td>
                  <td className="px-4 py-2">{avion.fechaFabricacion}</td>
                  <td>
                    <button onClick={() => deleteVuelo(vuelo._id)} type="button" className="bg-red-700 p-1 ">Eliminar</button>
                  </td>
                  <td>
                    <button onClick={() => updateVuelo(vuelo)} type="button" className="bg-teal-600 p-1">Editar</button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">No se encontraron pasajeros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Aviones;
