import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import CreatePasajero from "./pages/createPasajero.jsx";
import Home from "./pages/home.jsx";
import Aviones from "./pages/aviones.jsx";
import Vuelos from "./pages/vuelos.jsx";
import Reservas from "./pages/reservas.jsx";
import Agenda from "./pages/agendamiento.jsx";



function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/CreatePasajero" element={<CreatePasajero/>} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/aviones" element={<Aviones/>}/>
            <Route path="/vuelos" element={<Vuelos/>}/>
            <Route path="/reservas" element={<Reservas/>}/>
            <Route path="/agenda" element={<Agenda/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default App; 