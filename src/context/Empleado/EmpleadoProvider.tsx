import { createContext, ReactNode, useReducer } from "react";
import { IEmpleado } from "../../models/empleado.interface";
import empleadosService from "../../services/empleados.service";
import EmpleadoReducer from "./EmpleadoReducer";


//* Interfaz que define el state del contexto
export interface IEmpleadoContextState {
  empleados: IEmpleado[] | null,
  selectedEmpleado: IEmpleado | null
}

//* Interfaz que define lo que el contexto va a proveer
interface IEmpleadoContextProvider {
  empleados: IEmpleado[] | null,
  selectedEmpleado: IEmpleado | null,
  getAllEmpleados: () => Promise<void>,
  setSelectedEmpleado: (idEmpleado: number) => Promise<void>,
  clearSelectedEmpleado: () => void,
  createEmpleado: (empleado: IEmpleado) => Promise<void>,
  updateEmpleado: (idEmpleado: number, empleado: IEmpleado) => Promise<void>,
  deleteEmpleado: (idEmpleado: number) => Promise<void>
}

//* Context 
export const EmpleadoContext = createContext<IEmpleadoContextProvider>({
  empleados: null,
  selectedEmpleado: null,
  getAllEmpleados: async () => { },
  setSelectedEmpleado: async () => { },
  clearSelectedEmpleado: () => { },
  createEmpleado: async () => { },
  updateEmpleado: async () => { },
  deleteEmpleado: async () => { },
})

//* State provider

interface IProps {
  children: ReactNode
}

export const EmpleadoState = ({ children }: IProps) => {

  //* Inicializando los valores del state a retornar
  const EmpleadoContextInitialValues: IEmpleadoContextState = {
    empleados: null,
    selectedEmpleado: null
  }
  const [state, dispatch] = useReducer(EmpleadoReducer, EmpleadoContextInitialValues)

  //* Función para obtener todos los empleados
  const getAllEmpleados = async () => {
    const response = await empleadosService.getAllEmpleados()
    if (response.success) {
      dispatch({
        type: "GET_ALL_EMPLEADOS",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* Función para obtener un empleado
  const setSelectedEmpleado = async (idEmpleado: number) => {
    const response = await empleadosService.getEmpleadoById(idEmpleado)
    if (response.success) {
      dispatch({
        type: "SET_SELECTED_EMPLEADO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* Función para limpiar el selectedEmpleado
  const clearSelectedEmpleado = () => {
    dispatch({
      type: 'CLEAR_SELECTED_EMPLEADO',
      payload: null
    })
  }

  //*Función para crear un empleado
  const createEmpleado = async (empleado: IEmpleado) => {
    const response = await empleadosService.createEmpleado(empleado)
    if (response.success) {
      dispatch({
        type: "CREATE_EMPLEADO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* Función para actualizar la información de un empleado
  const updateEmpleado = async (idEmpleado: number, empleado: IEmpleado) => {
    const response = await empleadosService.updateEmpleado(idEmpleado, empleado)
    if (response.success) {
      dispatch({
        type: "UPDATE_EMPLEADO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  //* Función para eliminar un empleado
  const deleteEmpleado = async (idEmpleado: number) => {
    const response = await empleadosService.deleteEmpleadoById(idEmpleado)
    if (response.success) {
      dispatch({
        type: "DELETE_EMPLEADO",
        payload: response.payload
      })
    } else {
      throw new Error(response.message)
    }
  }

  return (
    <EmpleadoContext.Provider
      value={{
        empleados: state.empleados,
        selectedEmpleado: state.selectedEmpleado,
        getAllEmpleados,
        setSelectedEmpleado,
        clearSelectedEmpleado,
        createEmpleado,
        updateEmpleado,
        deleteEmpleado
      }}
    >
      {children}
    </EmpleadoContext.Provider>
  )
}