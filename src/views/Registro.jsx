import { createRef, useState} from 'react'
import { Link } from 'react-router-dom'

import clienteAxios from "../config/axios";
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
export default function Registro() {
    const ciRef = createRef();
    const nombresRef = createRef();
    const apellidosRef = createRef();
    const telefonoRef = createRef();
    const emailRef = createRef();

    const [errores, setErrores ] = useState([]);
    const {registro} = useAuth({middleware: 'auth'})
    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            ci: ciRef.current.value,
            nombres: nombresRef.current.value,
            apellidos: apellidosRef.current.value,
            telefono: telefonoRef.current.value,
            email: emailRef.current.value,
        }
        registro(datos, setErrores)
    }
  return (
    <>
        <h1 className=" text-4xl font-black">Registrar Cliente</h1>
        <p>Registra al cliente llenando el formulario</p>
        <div className=" bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form 
                onSubmit={handleSubmit}
                noValidate
            >
                
                {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                <div className=" mb-4">
                    <label
                        className=" text-slate-800"
                        htmlFor="ci"
                    >
                        Carnet:
                    </label>
                    <input 
                        type="text" 
                        id="ci"
                        className=" mt-2 w-full p-3 bg-gray-50"
                        name="ci"
                        placeholder="El carnet"
                        ref={ciRef}
                    />
                </div>

                <div className=" mb-4">
                    <label
                        className=" text-slate-800"
                        htmlFor="nombre"
                    >
                        Nombres:
                    </label>
                    <input 
                        type="text" 
                        id="nombre"
                        className=" mt-2 w-full p-3 bg-gray-50"
                        name="nombre"
                        placeholder="El nombre"
                        ref={nombresRef}
                    />
                </div>

                <div className=" mb-4">
                    <label
                        className=" text-slate-800"
                        htmlFor="apellidos"
                    >
                        Apellidos:
                    </label>
                    <input 
                        type="text" 
                        id="apellidos"
                        className=" mt-2 w-full p-3 bg-gray-50"
                        name="apellidos"
                        placeholder="El apellido"
                        ref={apellidosRef}
                    />
                </div>

                <div className=" mb-4">
                    <label
                        className=" text-slate-800"
                        htmlFor="telefono"
                    >
                        Celular:
                    </label>
                    <input 
                        type="tel" 
                        id="telefono"
                        className=" mt-2 w-full p-3 bg-gray-50"
                        name="telefono"
                        placeholder="El celular"
                        ref={telefonoRef}
                    />
                </div>

                <div className=" mb-4">
                    <label
                        className=" text-slate-800"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        className=" mt-2 w-full p-3 bg-gray-50"
                        name="email"
                        placeholder="El Email"
                        ref={emailRef}
                    />
                </div>


                <input 
                    type="submit"
                    value="Registrar Cliente"
                    className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    />

            </form>

        </div>

    </>
    
  )
}
