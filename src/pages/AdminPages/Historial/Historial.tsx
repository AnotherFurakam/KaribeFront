import React, { useContext, useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table";
import { PedidoContext } from "../../../context/Pedidos/PedidoProvider";
import { IPedidoResponse } from "../../../models/pedido.interface";
export interface HistorialInterface {}

//* Definiendo columnas a mostrar
const colums = {
  nro_mesa: "MESA",
  cliente: "CLIENTE",
  precio_total: "PRECIO",
  estado: "ESTADO",
  mesero: "MESERO",
  fecha: "FECHA",
};

interface IinitialState {
  id: number;
  nro_mesa: string;
  cliente: string;
  precio_total: string;
  estado: string;
  mesero: string;
  fecha: string;
}

const Historial: React.FC<HistorialInterface> = () => {
  const { pedidos, getAllPedidos, selectedPedido, clearSelectedPedidos } =
    useContext(PedidoContext);

  const [data, setData] = useState([] as IinitialState[]);

  const navigation = useNavigate();

  //? funcion para limpiar la data q se enviara a la tabla
  const cleanPedidos = (pedidos: IPedidoResponse[]): void => {
    const newPedidos: IinitialState[] = pedidos.map((pedido) => {
      const id = pedido.id;
      const nro_mesa = pedido.mesa.nro_mesa;
      const cliente = pedido.cliente;
      const precio_total = `S/.${pedido.orden.precio_total}`;
      const estado = pedido.finalizado ? "Finalizado" : "Abierta";
      const mesero = `${pedido.empleado.nombre} ${pedido.empleado.ape_paterno}`;
      const createAt = pedido.createAt.split("T");
      const fecha = createAt[0];

      return { id, nro_mesa, cliente, precio_total, estado, mesero, fecha };
    });
    setData(newPedidos);
  };

  const navigateDetPedido = (idPedido: number) => {
    navigation("/admin/pedidos/" + idPedido);
  };

  useEffect(() => {
    //* Obteniendo todos los pedidos desde el contexto
    getAllPedidos();

    //* Limpiamos el estado de selectedPedido
    clearSelectedPedidos();

    //* Seteando título de la página
    document.title = "El Karibe - Pedidos";
  }, []);

  useEffect(() => {
    //? ejecutamos la funcion q limpiara la data
    if (pedidos) cleanPedidos(pedidos);
  }, [pedidos]);

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex gap-4 align-items-center">
          <h3 className="m-0">Pedidos</h3>
          <FaBox size={40} fill={"#FFA20D"} />
        </div>
      </div>
      <Table
        data={data}
        colums={colums}
        crudButtons={false}
        customButton={true}
        customButtonTitle={"Detalle de Pedido"}
        customFunction={navigateDetPedido}
        editFunction={() => {}}
        deleteFunction={() => {}}
      />
    </>
  );
};

export default Historial;
