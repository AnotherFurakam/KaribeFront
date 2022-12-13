import { IEmpleado } from "../models/empleado.interface";
import { Response } from "../models/response.interface";

const API_URL: string = import.meta.env.VITE_API_URL;

const getAllEmpleados = async (): Promise<Response<IEmpleado[]>> => {
  const response = await fetch(`${API_URL}/empleado`);
  const data = await response.json();
  return data;
};

const getEmpleadoById = async (idEmpleado: number): Promise<Response<IEmpleado>> => {
  const response = await fetch(`${API_URL}/empleado/`+idEmpleado);
  const data = await response.json()
  return data
}

const createEmpleado = async (empleado: IEmpleado): Promise<Response<IEmpleado>> => {
  const response = await fetch(`${API_URL}/empleado`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleado)
  })
  const data = await response.json()
  return data
}

const updateEmpleado = async (idEmpleado: number,empleado: IEmpleado): Promise<Response<IEmpleado>> => {
  const response = await fetch(`${API_URL}/empleado/`+ idEmpleado,{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleado)
  })
  const data = await response.json()
  return data
}

const deleteEmpleadoById = async (idEmpleado: number): Promise<Response<IEmpleado>> => {
  const response = await fetch(`${API_URL}/empleado/`+idEmpleado,{
    method: 'DELETE'
  });
  const data = await response.json()
  return data
}

export default {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleadoById
}