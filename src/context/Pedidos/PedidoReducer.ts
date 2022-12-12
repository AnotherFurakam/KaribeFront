import {
  IPedidoResponse,
  IDetPedidoResponse,
} from "../../models/pedido.interface";
import { PedidoContextState } from "./PedidoProvider";

//? Definimos una interfaz para el action
/**
 * * De esta forma le podremos indicar con exactitud que ación queremos
 * * realizar, el payload puede ser any ya que enviaremos distintos tipos
 * * de datos pero tambien podemos indicar el tipo de datos que puede
 * * recibir sin ningún tipo de problema, sin embargo deberemos ser más
 * * específicos a la hora de retornar los estados como se ve en el ejemplo
 */
interface PedidoReducerAction {
  type: "GET_ALL_PEDIDOS" | "GET_PEDIDO" | "CLEAR_SELECTED_PEDIDO";
  payload:
    | IPedidoResponse[]
    | IPedidoResponse
    | IDetPedidoResponse
    | IDetPedidoResponse[]
    | null;
}

export default function (
  state: PedidoContextState,
  action: PedidoReducerAction
): PedidoContextState {
  const { type, payload } = action;

  switch (type) {
    case "GET_ALL_PEDIDOS":
      return { ...state, pedidos: payload as IPedidoResponse[] }; //! Indicarle que le payload es de tipo IPedidoResponse[]

    case "GET_PEDIDO":
      return { ...state, selectedPedido: payload as IPedidoResponse }; //! Seteando el pedido obtenido por el id

    case "CLEAR_SELECTED_PEDIDO":
      return { ...state, selectedPedido: payload as null };

    default:
      return state;
  }
}
