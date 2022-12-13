import { IPedidoResponse } from "../models/pedido.interface";
import { Response } from "../models/response.interface";

const API_URL: string = import.meta.env.VITE_API_URL;

const getAllPedidos = async (): Promise<Response<IPedidoResponse[]>> => {
  const response = await fetch(`${API_URL}/comandas/pagadas/mesero`);
  const data = await response.json();
  return data;
};

const getPedidoById = async (
  id: number
): Promise<Response<IPedidoResponse>> => {
  const response = await fetch(`${API_URL}/comandas/${id}`);
  const data = await response.json();
  return data;
};

export default { getAllPedidos, getPedidoById };
