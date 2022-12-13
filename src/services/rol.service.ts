import { Response } from "../models/response.interface";
import { IRol } from "../models/rol.interface";

const API_URL: string = import.meta.env.VITE_API_URL;
// console.log(API_URL);

const getAllRoles = async (): Promise<Response<IRol[]>> => {
  const response = await fetch(`${API_URL}/rol`);
  const data = await response.json();
  return data;
};

export default {
  getAllRoles
}