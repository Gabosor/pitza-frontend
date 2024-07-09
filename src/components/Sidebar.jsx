import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"
export default function Sidebar() {
    const {categorias} = useQuiosco()
    const {logout, user} = useAuth({middleware: 'auth'})
  return (
    <aside className=" md:w-72">
        <div 
            className=" p-4"
            
        >
            <img src="img/logo.svg" alt="imagen logo" />
        </div>    

        <div className=" mt-10">
            {categorias.map( categoria => (
                <Categoria 
                    key={categoria.id}
                    categoria = {categoria}
                />
            ))}
        </div>
        <div className=" px-5 my-5">
            <button
                type="button"
                className=" text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                onClick={logout}
            >
                Cerrar Sesión
            </button>
        </div>
    </aside>
  )
}
