import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { formatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';
import ResumenProducto from './ResumenProducto';
import clienteAxios from '../config/axios';

export default function Resumen() {
  const { pedido, total, handleSubmitNuevaOrden } = useQuiosco();
  const [searchQuery, setSearchQuery] = useState('');
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedCliente) {
      handleSubmitNuevaOrden(selectedCliente.id);
    } else {
      alert('Por favor, seleccione un cliente.');
    }
  };

  const comprobarPedido = () => pedido.length === 0;

  const debouncedSearch = useCallback(debounce(async (query) => {
    if (query.length >= 3) {
      try {
        const { data } = await clienteAxios.get(`/api/clientes`, {
          params: { query }
        });
        setClientes(data);
      } catch (error) {
        console.error('Error al buscar clientes:', error);
      }
    } else {
      setClientes([]);
    }
  }, 300), []);

  const handleSearchChange = e => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelectChange = e => {
    const clienteId = e.target.value;
    const cliente = clientes.find(cliente => cliente.id === parseInt(clienteId, 10));
    setSelectedCliente(cliente);
  };

  return (
    <aside className="w-72 overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Pedido</h1>
      <p className="text-lg my-5">Lista de los productos seleccionados</p>

      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">No hay productos en el pedido</p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )}
      </div>

      <p className="text-xl mt-10">
        Total: {formatearDinero(total)}
      </p>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-5">
          <label htmlFor="" className='font-bold uppercase'>Buscar cliente</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Buscar cliente por nombre o carnet"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {clientes.length > 0 && (
            <select
              className="border p-2 w-full mt-2"
              onChange={handleSelectChange}
              value={selectedCliente ? selectedCliente.id : ''}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.ci} - {cliente.nombres}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mt-5">
          <input
            type="submit"
            className={`${
              comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600'
            } hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
            value="Confirmar Pedido"
            disabled={comprobarPedido() || !selectedCliente}
          />
        </div>
      </form>
    </aside>
  );
}
