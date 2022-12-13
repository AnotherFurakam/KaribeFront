import { IComanda } from "../models/comanda.interface";
import { Response } from "../models/response.interface";

const API_URL: string = import.meta.env.VITE_API_URL;

const getAllComandasFinalizadas = async (): Promise<Response<IComanda[]>> => {
  const response = await fetch(`${API_URL}/comandas/no-pagadas/mesero`)
  const data = await response.json()
  console.log(data)
  return data
}

const pagar = async (idComanda: number) => {
  const response = await fetch(`${API_URL}/comandas/`+idComanda+'/pagar',{
    method: 'POST'
  })
}

export default {
  getAllComandasFinalizadas,
  pagar
}