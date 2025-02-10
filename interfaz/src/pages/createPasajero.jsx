import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Necesario para usar navigate
import { FaHome, FaCalendar, FaPlane, FaMapMarkedAlt, FaSuitcase, FaFileInvoice, FaTicketAlt, FaTruck, FaClipboardList, FaUser, FaSignOutAlt, FaUsers } from "react-icons/fa"; // Asegúrate de importar los íconos
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
//crear pasajeros 
function CreatePasajero() {
  const { register, handleSubmit, reset } = useForm(); // Necesario para usar useForm
  const [pasajeros, setPasajeros] = useState([]); // Estado para guardar los pasajeros
  const [loading, setLoading] = useState(false); // Para mostrar un mensaje de carga
  const [searchQuery, setSearchQuery] = useState(""); // Para buscar pasajeros
  const navigate = useNavigate(); //inicializamos el navigate


  // listar pasajeros
  const fetchPasajeros = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/getPasajeros',{
        withCredentials: true,
      });
      console.log("datos recibidos", response.data);// Muestra los datos recibidos

      setPasajeros(response.data);
    } catch (error) {
      console.error("Error al cargar los pasajeros", error);

    } finally {
      setLoading(false);
    }
  };  

  const searchPasajero = async () => {
    if (!searchQuery || searchQuery.trim() === "") {
      console.error("El campo de búsqueda está vacío");
      return;
    }
  
    setLoading(true);
  
    try {
      let param;
      if (searchQuery.includes('@')) {
        param = 'email';
      } else if (!isNaN(searchQuery)) {
        param = 'id';
      } else {
        param = 'nombres';
      }
  
      const url = `http://localhost:4000/api/buscarPasajero?${param}=${encodeURIComponent(searchQuery)}`;
      
      const response = await axios.get(url, { withCredentials: true });
      console.log("Datos recibidos de la API", response.data);
  
      // Asegurar que la respuesta siempre sea un array antes de asignarla a setPasajeros
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setPasajeros(data);
      
      console.log("Estado de pasajeros actualizado", data);
    } catch (error) {
      console.error("Error al buscar pasajero", error);
      if (error.response) {
        console.error("Detalles del error", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const deletePasajero =async (id) => {
    if(!id) {
      console.error("ID no es valido");
      return;
    }

    const confirmDelete = window.confirm("Esta seguro de eliminar el registro?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/deletePasajero/${id}`,{
          withCredentials: true,
        });

        setPasajeros(pasajeros.filter((pasajero) => pasajero._id !== id));
        console.log(`Pasajero con id: ${id} eliminado`);
      } catch (error) {
        console.error('Error al eliminar pasajero', error);
      }
    }
  };

  const updatePasajero = async (id, updateData) => {
    try{
      const response = await axios.put(
        `http://localhost:4000/api/updatePasajero/${id}`,
      updateData,{withCredentials:true,}      
      );

    console.log("pasajero actualizado", response.data);

    setPasajeros((prevPasajeros) => 
    prevPasajeros.map((pasajero) => 
    pasajero._id === id ? {...pasajero, ...updateData} : pasajero
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
    const documento = Number(values.documento);
    const edad = Number(values.edad);
    const telefono = Number(values.telefono);

    if (pasajeros.some((pasajero) => pasajero.documento === documento)) {
      console.error("El documento ya está registrado.");
      return;
    }

    if (isNaN(documento) || isNaN(edad) || isNaN(telefono)) {
      console.error("Recuerda ingresar correctamente los campos numéricos");
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/createPasajeros', {
        ...values,
        documento,
        edad,
        telefono
      });

      if (res.status === 200) {
        setPasajeros((prev) => [...prev, res.data]);
        reset();
      }
    } catch (error) {
      console.error("Error al crear pasajero", error);
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
            <FaClipboardList size={20} className="mr-2" /> Vuelos
          </span>

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
            <label htmlFor="documento" className="block text-md ml-2 font-semibold text-gray-700 mb-1">Documento:</label>
            <input type="Number" {...register("documento", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="nombres" className="block text-md ml-2 font-semibold text-white mb-1">Nombres</label>
            <input type="text" {...register("nombres", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="apellidos" className="block text-md ml-2 font-semibold text-white mb-1">Apellidos</label>
            <input type="text" {...register("apellidos", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="pais" className="block text-md ml-2 font-semibold text-white mb-1">Pais</label>
            <input type="text" {...register("pais", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="edad" className="block text-md ml-2 font-semibold text-white mb-1">Edad</label>
            <input type="Number" {...register("edad", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-md ml-2 font-semibold text-white mb-1">Teléfono</label>
            <input type="Number" {...register("telefono", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
          </div>
          <div>
            <label htmlFor="email" className="block text-md ml-2 font-semibold text-white mb-1">Email:</label>
            <input type="email" {...register("email", { required: true })}
              className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
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
              <th className="px-4 py-2 border-b">documento</th>
              <th className="px-4 py-2 border-b">nombres</th>
              <th className="px-4 py-2 border-b">apellidos</th>
              <th className="px-4 py-2 border-b">pais</th>
              <th className="px-4 py-2 border-b">edad</th>
              <th className="px-4 py-2 border-b">telefono</th>
              <th className="px-4 py-2 border-b">email</th>
              <th className="">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">Cargando...</td>
              </tr>
            ) : pasajeros.length > 0 ? (
              pasajeros.map((pasajero) => (
                <tr key={pasajero._id} className="border-b">
                  <td className="px-4 py-2">{pasajero._id || "SIN ID"}</td>
                  <td className="px-4 py-2">{pasajero.documento}</td>
                  <td className="px-4 py-2">{pasajero.nombres}</td>
                  <td className="px-4 py-2">{pasajero.apellidos}</td>
                  <td className="px-4 py-2">{pasajero.pais}</td>
                  <td className="px-4 py-2">{pasajero.edad}</td>
                  <td className="px-4 py-2">{pasajero.telefono}</td>
                  <td className="px-4 py-2">{pasajero.email}</td>
                  <td>
                    <button onClick={() => deletePasajero(pasajero._id)} type="button" className="bg-red-700 p-1 ">Eliminar</button>
                  </td>
                  <td>
                    <button onClick={() => updatePasajero(pasajero)} type="button" className="bg-teal-600 p-1">Editar</button>
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

export default CreatePasajero;
