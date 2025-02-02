//cambiar la config de la llamada de la api

import axios from "axios";

const API = 'http://localhost:4000/api'

export const createRequest = user => axios.post(`${API}/createPasajeros`, user);