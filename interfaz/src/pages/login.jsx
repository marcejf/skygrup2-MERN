import { useState } from "react";
import axios from "axios";
import  UserAvatar from "../img/avionnn2.jfif";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(!email || !password){
      setError("todos los campos son obligatorios");
    }


    try {
      console.log("datos enviados al backend", {email, password});
      const response = await axios.post(
        "http://localhost:4000/api/login", 
        { email, password },
        { withCredentials: true,
          headers: {"Content-Type" : "application/json"}
        } // Permitir el envío de cookies
      );
      console.log("Login successful", response.data);

      navigate("/home");

      
    } catch (err) {
        console.error("Error en el inicio de sesión:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Error en el inicio de sesión.");
      }
      
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-100 p-4">
      <div className="w-full max-w-md bg-dark shadow-lg rounded-2xl p-6">
        <div className="flex justify-center mb-4">
          <img
            src={UserAvatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <h1 className="text-center text-4xl mb-6">BIENVENIDO A SKYGRUP</h1>
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
          <div>
            <label className="block text-black-600 text-sm font-medium text-white">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black-500 focus:outline-blue text-black"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
          <p className="text-center text-sm text-gray-600">
            <a href="#" className="text-slate-100 hover:underline">¿Olvidaste tu contraseña?</a>
          </p>
        </form>
      </div>
    </div>
  )
}
