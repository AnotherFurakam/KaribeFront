import React, { useContext, useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Table } from "../../../components/Table";
import { PedidoContext } from "../../../context/Pedidos/PedidoProvider";
import { IPedidoResponse } from "../../../models/pedido.interface";
export interface DetPedidoInterface {}

//* Definiendo columnas a mostrar
const colums = {
  producto: "PRODUCTO",
  tipo: "TIPO",
  cantidad: "CANTIDAD",
  precio_unidad: "PRECIO UNIDAD",
  precio_total: "PRECIO TOTAL",
};

interface IinitialState {
  id: number;
  producto: string;
  tipo: string;
  cantidad: number;
  precio_unidad: string;
  precio_total: string;
}

const DetallePedido: React.FC<DetPedidoInterface> = () => {
  const { selectedPedido, getPedidoById } = useContext(PedidoContext);
  const [data, setData] = useState([] as IinitialState[]);
  const { id } = useParams();

  //? funcion para limpiar la data q se enviara a la tabla
  const cleanDetPedido = (pedidos: IPedidoResponse) => {
    const newDetPedido: IinitialState[] = pedidos.orden.Detalle_orden.map(
      (detalle) => {
        const id = detalle.id;
        const producto = detalle.opproducto_local.opcion.producto.titulo;
        const tipo = detalle.opproducto_local.opcion.titulo;
        const cantidad = detalle.cantidad;
        const precio_unidad = `S/.${detalle.precio}`;
        const precio_total = `S/.${detalle.precio_total}`;
        return { id, producto, tipo, cantidad, precio_unidad, precio_total };
      }
    );

    setData(newDetPedido);
  };

  useEffect(() => {
    getPedidoById(Number(id));
  }, []);

  useEffect(() => {
    //? ejecutamos la funcion q limpiara la data
    if (selectedPedido) cleanDetPedido(selectedPedido);
  }, [selectedPedido]);

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex gap-4 align-items-center">
          <h3 className="m-0">Detalle de Pedido</h3>
          <FaBox size={40} fill={"#FFA20D"} />
        </div>
      </div>
      <Table
        data={data}
        colums={colums}
        crudButtons={false}
        customButton={false}
        customButtonTitle={""}
        customFunction={() => {}}
        editFunction={() => {}}
        deleteFunction={() => {}}
      />
    </>
  );
};

export default DetallePedido;
