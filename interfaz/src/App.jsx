import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import CreatePasajero from "./pages/createPasajero.jsx";
import Home from "./pages/home.jsx";
import Aviones from "./pages/aviones.jsx";



function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/CreatePasajero" element={<CreatePasajero/>} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/Aviones" element={<Aviones/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default App; 