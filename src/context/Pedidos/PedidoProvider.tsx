import { createContext, ReactNode, useReducer } from "react";
import {
  IDetPedidoResponse,
  IPedidoResponse,
} from "../../models/pedido.interface";
import pedidoService from "../../services/pedido.service";
import PedidoReducer from "./PedidoReducer";

//? Definiendo la interfaz del estate del contexto
//* En caso de querer añadir mas estados debemos definirlos aquí primero
export interface PedidoContextState {
  pedidos: IPedidoResponse[] | null;
  selectedPedido: IPedidoResponse | null;
  selectedDetPedido: IDetPedidoResponse | null;
}

//? Inicializando el estado del context
//* Si agregamos mas estados debemos inicializarlos aqui
const PedidoInitialState: PedidoContextState = {
  pedidos: null,
  selectedPedido: null,
  selectedDetPedido: null,
};

//? Definiendo la interfaz de lo que proveera el contexto
//* Aqui debemos definir los estado y funciones que proveeremos
//* a los componentes que usen el contexto
interface PedidoContextProvide {
  pedidos: IPedidoResponse[] | null;
  selectedPedido: IPedidoResponse | null;
  selectedDetPedido: IDetPedidoResponse | null;
  getAllPedidos: () => Promise<void>;
  getPedidoById: (id: number) => Promise<void>;
  clearSelectedPedidos: () => void;
}

//? Creando el context con datos inicializados por defecto
//* Debemos inicializar tambien los estados y funciones que proveeremos
export const PedidoContext = createContext<PedidoContextProvide>({
  pedidos: null,
  selectedPedido: null,
  selectedDetPedido: null,
  getAllPedidos: async () => {},
  getPedidoById: async () => {},
  clearSelectedPedidos: () => {},
});

//*StateProvider
interface Props {
  children: ReactNode;
}

const PedidoState = ({ children }: Props) => {
  //* Haremos uso del reducer e indicaremos el objeto donde inicializamos el estado previamente definido
  const [state, dispatch] = useReducer(PedidoReducer, PedidoInitialState);

  //* Función que obtiene la lista de todos los locales desde el bakend
  const getAllPedidos = async () => {
    const response = await pedidoService.getAllPedidos();
    if (response.success) {
      dispatch({
        type: "GET_ALL_PEDIDOS",
        payload: response.payload,
      });
    } else {
      throw new Error(response.message);
    }
  };

  //* Función para obtener los datos de un solo producto
  const getPedidoById = async (id: number) => {
    const response = await pedidoService.getPedidoById(id);
    if (response.success) {
      dispatch({
        type: "GET_PEDIDO",
        payload: response.payload,
      });
    } else {
      throw new Error(response.message);
    }
  };

  //* Función para limpiar el estado Local Selected
  const clearSelectedPedidos = () => {
    dispatch({
      type: "CLEAR_SELECTED_PEDIDO",
      payload: null,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidos: state.pedidos,
        selectedPedido: state.selectedPedido,
        selectedDetPedido: state.selectedDetPedido,
        getAllPedidos,
        getPedidoById,
        clearSelectedPedidos,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
