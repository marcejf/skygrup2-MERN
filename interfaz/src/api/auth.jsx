//cambiar la config de la llamada de la api

import axios from "axios";


const API = 'http://localhost:4000/api'

export const createRequest = user => axios.post(`${API}/createPasajeros`, user);


export const getPasajerosRequest = async () => {
    return await axios.get("http://localhost:3000/api/v1/pasajero");
};

