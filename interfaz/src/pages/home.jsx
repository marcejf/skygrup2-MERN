import { useNavigate } from "react-router-dom";
import { FaPlane, FaSuitcase, FaFileInvoice, FaUser, FaTicketAlt, FaTruck, FaClipboardList, FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";
import AvionHome from '../img/avionhome.jpg';
import Cartagena2 from '../img/cartagena2.jfif';
import Lima from '../img/lima.jfif';
import Paris from '../img/paris.jfif';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen">
      <nav className="bg-blue-700 text-white py-6 px-3 shadow-md">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 overflow-x-auto">
          <span onClick={() => navigate("/aviones")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
            <FaPlane size={20} className="mr-2" /> Aviones
          </span>
          <span onClick={() => navigate("/aeropuertos")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
            <FaMapMarkedAlt size={20} className="mr-2" /> Aeropuertos
          </span>
          <span onClick={() => navigate("/equipajes")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
            <FaSuitcase size={20} className="mr-2" /> Equipajes
          </span>
          <span onClick={() => navigate("/facturas")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
            <FaFileInvoice size={20} className="mr-2" /> Facturas
          </span>
          <span onClick={() => navigate("/CreatePasajero")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
            <FaMapMarkedAlt size={20} className="mr-2" />Pasajeros
          </span>
          <span onClick={() => navigate("/pasajes")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
            <FaTicketAlt size={20} className="mr-2" /> Pasajes
          </span>
          <span onClick={() => navigate("/proveedores")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
            <FaTruck size={20} className="mr-2" /> Proveedores
          </span>
          <span onClick={() => navigate("/reservas")} className="flex items-center cursor-pointer hover:text-blue-300 transition-colors">
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
                      <FaUser className="mr-2" /> Empleados
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/usuarios")}
                      className={`flex items-center w-full px-4 py-2 text-red-500 ${active ? "bg-gray-200" : ""}`}>
                      <FaSignOutAlt className="mr-2" /> Usuarios
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/Login")}
                      className={`flex items-center w-full px-4 py-2 text-red-500 ${active ? "bg-gray-200" : ""}`}>
                      <FaSignOutAlt className="mr-2" /> Cerrar Sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>

      <div className="bg-blue-300 flex justify-center items-center">
        <div className="w-full mt-2">
          <img src={AvionHome} alt="Avion Home" className="w-full h-[60vh] object-top mt-3"/>
        </div>
      </div>

      <div>
        <h1 className="text-center text-white text-4xl mt-28 m-10 font-serif underline">VUELA CON NOSOTROS A LUGARES MÁGICOS</h1>
      </div>

      <div className="bg-blue-300 flex justify-center items-center">
        <div className="w-500">
          <img src={Cartagena2} alt="Cartagena2" className="w-full h-[60vh] object-top mt-3"/>
        </div>
        <div>
          <img src={Lima} alt="Lima" className="w-full h-[60vh] object-top mt-3"/>
        </div>  
        <div>
          <img src={Paris} alt="Paris" className="w-full h-[60vh] object-top mt-3"/>
        </div>     
      </div>
    </div>
  );
}
