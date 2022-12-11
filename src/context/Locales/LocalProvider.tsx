import { createContext, ReactNode, useReducer } from "react";
import { ILocal } from "../../models/local.interface";
import localService from "../../services/local.service";
import LocalReducer from "./LocalReducer";

//? Definiendo la interfaz del estate del contexto
//* En caso de querer añadir mas estados debemos definirlos aquí primero
export interface LocalContextState {
  locales: ILocal[] | null;
  selectedLocal: ILocal | null;
}

//? Inicializando el estado del context
//* Si agregamos mas estados debemos inicializarlos aqui
const LocalInitialState: LocalContextState = {
  locales: null,
  selectedLocal: null,
};

//? Definiendo la interfaz de lo que proveera el contexto
//* Aqui debemos definir los estado y funciones que proveeremos a los componentes que usen el contexto
interface LocalContextProvide {
  locales: ILocal[] | null;
  selectedLocal: ILocal | null;
  getAllLocales: () => Promise<void>;
  postLocal: (producto: ILocal) => Promise<void>;
  getLocalById: (id: number) => Promise<void>;
  putLocal: (id: number, producto: ILocal) => Promise<void>;
  deleteLocal: (id: number) => Promise<void>;
  clearSelectedLocal: () => void;
}

//? Creando el context con datos inicializados por defecto
//* Debemos inicializar tambien los estados y funciones que proveeremos
export const LocalContext = createContext<LocalContextProvide>({
  locales: null,
  selectedLocal: null,
  getAllLocales: async () => {},
  postLocal: async () => {},
  getLocalById: async () => {},
  putLocal: async () => {},
  deleteLocal: async () => {},
  clearSelectedLocal: () => {},
});

//*StateProvider
interface Props {
  children: ReactNode;
}

const LocalState = ({ children }: Props) => {
  //* Haremos uso del reducer e indicaremos el objeto donde inicializamos el estado previamente definido
  const [state, dispatch] = useReducer(LocalReducer, LocalInitialState);

  //* Función que obtiene la lista de todos los locales desde el bakend
  const getAllLocales = async () => {
    const response = await localService.getAllLocales();
    if (response.success) {
      dispatch({
        type: "GET_ALL_LOCALES",
        payload: response.payload,
      });
    } else {
      throw new Error(response.message);
    }
  };

  //* Función para obtener los datos de un solo local
  const getLocalById = async (id: number) => {
    const response = await localService.getLocalById(id);
    if (response.success) {
      dispatch({
        type: "GET_LOCAL",
        payload: response.payload,
      });
    } else {
      throw new Error(response.message);
    }
  };

  //* Función para registrar un local
  const postLocal = async (producto: ILocal) => {
    const response = await localService.postLocal(producto);
    if (response.success) {
      dispatch({
        type: "POST_LOCAL",
        payload: response.payload,
      });
    } else {
      throw new Error(response.message);
    }
  };

  //* Función para actualizar un local
  const putLocal = async (id: number, producto: ILocal) => {
    const response = await localService.putLocal(id, producto);
    if (response.success) {
      dispatch({
        type: "PUT_LOCAL",
        payload: response.payload,
      });
    } else {
      throw new Error(response.message);
    }
  };

  //* Funcion para eliminar un local
  const deleteLocal = async (id: number) => {
    const response = await localService.deleteLocalById(id);
    if (response.success) {
      dispatch({
        type: "DELETE_LOCAL",
        payload: response.payload,
      });
    } else {
      throw new Error(response.message);
    }
  };

  //* Función para limpiar el estado Local Selected
  const clearSelectedLocal = () => {
    dispatch({
      type: "CLEAR_SELECTED_LOCAL",
      payload: null,
    });
  };

  return (
    <LocalContext.Provider
      value={{
        locales: state.locales,
        selectedLocal: state.selectedLocal,
        getAllLocales,
        getLocalById,
        postLocal,
        putLocal,
        deleteLocal,
        clearSelectedLocal,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
};
export default LocalState;
