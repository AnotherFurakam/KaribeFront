import { IOpcionProducto } from "./opcion_producto.interface";

export interface IProducto {
  id?: number,
  titulo: string,
  descripcion: string,
  url: string,
  de_cocina: boolean,
  opcion?: IOpcionProducto[] //!Cambiar esto cuando se difina la interface de opcion_producto
}