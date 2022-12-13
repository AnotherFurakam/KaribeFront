import { IRol } from "./rol.interface";

export interface IEmpleado {
  id?: number,
  nombre: string,
  ape_paterno: string,
  ape_materno: string,
  documento: string,
  genero: string,
  fecha_nacimiento: string,
  telefono: string,
  correo: string,
  createAt?: string,
  rol_id?: number,
  rol?: IRol,
  local?: Local,
  local_id?: number,
}

interface Local {
  id: number,
  descripcion: string
}