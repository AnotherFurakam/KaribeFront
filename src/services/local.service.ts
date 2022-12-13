import { ILocal } from "../models/local.interface";
import { Response } from "../models/response.interface";

const API_URL: string = import.meta.env.VITE_API_URL;
// console.log(API_URL);

const getAllLocales = async (): Promise<Response<ILocal[]>> => {
  const response = await fetch(`${API_URL}/local`);
  const data = await response.json();
  return data;
};

const getLocalById = async (id: number): Promise<Response<ILocal>> => {
  const response = await fetch(`${API_URL}/local/${id}`);
  const data = await response.json();
  return data;
};

const postLocal = async (producto: ILocal): Promise<Response<ILocal>> => {
  const response = await fetch(`${API_URL}/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  const data = await response.json();
  return data;
};

const putLocal = async (
  id: number,
  producto: ILocal
): Promise<Response<ILocal>> => {
  const response = await fetch(`${API_URL}/local/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  const data = await response.json();
  return data;
};

const deleteLocalById = async (id: number): Promise<Response<ILocal>> => {
  const response = await fetch(`${API_URL}/local/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export default {
  getAllLocales,
  postLocal,
  getLocalById,
  putLocal,
  deleteLocalById,
};
