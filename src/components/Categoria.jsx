import useQuiosco from "../hooks/useQuiosco"
import clienteAxios from "../config/axios"
export default function Categoria({categoria}) {
  const { handleClickCategoria, categoriaActual} = useQuiosco()
    const {icono, id, nombre} = categoria
    const baseURL = clienteAxios.defaults.baseURL;
    
  return (
    <div className={`${categoriaActual.id=== id ? "bg-amber-400": "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        <img src={`${baseURL}/storage/img/${icono}`}
            alt="categorias"
            className=" w-12"
         />
         <button 
            className=" text-lg font-bold cursor-pointer truncate"
            type="button"
            onClick={() => handleClickCategoria(id)}
          >
            {nombre}
         </button>
    </div>
  )
}
