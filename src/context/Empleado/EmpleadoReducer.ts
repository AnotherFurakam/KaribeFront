import { IEmpleado } from "../../models/empleado.interface";
import { IEmpleadoContextState } from "./EmpleadoProvider";

interface IEmpleadoReducerAction {
  type: 
  'GET_ALL_EMPLEADOS' |
  'CREATE_EMPLEADO' |
  'UPDATE_EMPLEADO' |
  'SET_SELECTED_EMPLEADO' |
  'CLEAR_SELECTED_EMPLEADO' |
  'DELETE_EMPLEADO',
  payload: IEmpleado[] | IEmpleado | null
}

export default function (state: IEmpleadoContextState, action: IEmpleadoReducerAction): IEmpleadoContextState {

  const { type, payload }: IEmpleadoReducerAction = action

  switch (type) {
    case 'GET_ALL_EMPLEADOS':
      return { ...state, empleados: payload as IEmpleado[] }

    case 'CREATE_EMPLEADO':
      return {...state, empleados: [...state.empleados as IEmpleado[], payload as IEmpleado]}

    case 'UPDATE_EMPLEADO':
      const updatedArray: IEmpleado[] = state.empleados?.map(e => e.id === (payload as IEmpleado).id ? payload : e) as IEmpleado[]
      return {...state, empleados: updatedArray}

    case 'SET_SELECTED_EMPLEADO':
      return {...state, selectedEmpleado: payload as IEmpleado}

    case 'CLEAR_SELECTED_EMPLEADO':
      return {...state, selectedEmpleado: payload as null}

    case 'DELETE_EMPLEADO':
      const filteredArray: IEmpleado[] = state.empleados?.filter(e => e.id !== (payload as IEmpleado).id) as IEmpleado[]
      return {...state, empleados: filteredArray}

    default:
      return state;
  }
}