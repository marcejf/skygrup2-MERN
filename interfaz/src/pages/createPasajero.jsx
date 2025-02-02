import { useForm } from "react-hook-form";
import { createRequest } from "../api/auth.jsx";

function CreatePasajero(){
    const {register, handleSubmit, reset}= useForm();
    const onSubmit = async (values) => {
        const documento  = Number(values.documento);
        const edad  = Number(values.edad);
        const telefono  = Number(values.telefono);

        if(isNaN(documento) || isNaN(edad) || isNaN(telefono)) {
            console.error("recuerda ingresar correctamente los campos numericos");
            return;
        }

        const  res = await createRequest({ ...values, documento, edad, telefono});
        console.log(res)

        reset();
    
    };

    return(

        <div>
        <h1 className="text-4xl font-bold text-center p-9">AEROLINEA2  SKYGRUP  MERN</h1>
        <h2 className="text-4xl font-bold text-center p-3">Registrar Pasajero</h2>
        <form className="max-w-4xl mx-auto" 
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="documento" className="block text-md ml-2 font-semibold text-gray-700 mb-1">Documento:</label>
                    <input type="Number" {...register("documento", { required: true })}
                        className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"/>
                </div>
                <div>
                    <label htmlFor="nombres" className="block text-md ml-2 font-semibold text-gray-700 mb-1">Nombres</label>
                    <input type="text" {...register("nombres", { required: true })}
                        className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="apellidos" className="block text-md ml-2 font-semibold text-gray-700 mb-1">apellidos</label>
                    <input type="text" {...register("apellidos", { required: true })}
                        className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="pais" className="block text-md ml-2 font-semibold text-gray-700 mb-1">Pais</label>
                    <input type="text" {...register("pais", { required: true })}
                        className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="edad" className="block text-md ml-2 font-semibold text-gray-700 mb-1">Edad</label>
                    <input type="Number" {...register("edad", { required: true })}
                        className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="telefono" className="block text-md ml-2 font-semibold text-gray-700 mb-1">Teléfono</label>
                    <input type="Number" {...register("telefono", { required: true })}
                        className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-md ml-2 font-semibold text-gray-700 mb-1">Email:</label>
                    <input type="email" {...register("email", { required: true })}
                        className="w-full max-w-md sm:w-auto p-2 md:p-2 ml-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                </div>
            </div>
                {/* Botones */}
                <div className="space-x-4 mt-4">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"> Crear </button>
                <button type="reset" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Borrar </button>
                <button type="button" className=" text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 font-medium text-sm py-2.5 px-5 me-2 mb-2 "> Listar </button>
                <input type="search" placeholder="Buscar cliente..." className="w-60 p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg" />
                <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"> Buscar </button>                
                </div>
        </form>

        </div>
    )
}


export default CreatePasajero;