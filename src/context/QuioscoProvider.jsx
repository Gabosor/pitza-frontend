import { Children, createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import clienteAxios from '../config/axios';
const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => 
{
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    

    useEffect(() => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad)+total, 0)
        setTotal(nuevoTotal)
    },[pedido])



    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }
    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }
    //Elimina la categoria y la imagen
    const handleAgregarPedido = ({categoria_id, ...producto}) => {
          //copia lo que hay en pedido y agrega el nuevo producto
        if(pedido.some( pedidoState =>pedidoState.id === producto.id ))
        {
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id ===producto.id ? producto : pedidoState )
            setPedido(pedidoActualizado)
            toast.success('Actualizado el Pedido')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

    }
    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }
    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success("Elimnado del Pedido")
    }
    const obtenerCategorias = async () => {
         const token = localStorage.getItem('AUTH_TOKEN')
        try{
            const {data} = await clienteAxios("/api/categorias", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        }catch(error)
        {
            console.log(error);
        }
    }
    useEffect(() => {
        obtenerCategorias()
    }, [])

    const handleSubmitNuevaOrden = async (clienteId) => {
        console.log(clienteId)
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post('/api/pedidos', {
            total,
            productos: pedido.map(producto => {
                return {
                id: producto.id,
                cantidad: producto.cantidad
                };
            }),
            cliente_id: clienteId 
            },
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            toast.success(data.message);
            setTimeout(() => {
            setPedido([]);
            }, 1000);
        } catch (error) {
            console.error('Error al crear el pedido:', error);
        }
        };
    const handleClickCompletarPedido =  async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            
        }
    }

    const handleClickProductoAgotado =  async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            
        }
    }
    const obtenerClientes = async () => {
         const token = localStorage.getItem('AUTH_TOKEN')
        try{
            const {data} = await clienteAxios("/api/clientes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClientes(data.data);
            setClienteActual(data.data[0]);
        }catch(error)
        {
            console.log(error);
        }
    }
    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado,
                obtenerClientes
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}
export {
    QuioscoProvider
}

export default QuioscoContext