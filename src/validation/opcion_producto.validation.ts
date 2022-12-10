import * as Yup from "yup";
import { IOpcionProducto } from "../models/opcion_producto.interface";


export const OpcionProductoSchema: Yup.SchemaOf<IOpcionProducto> = Yup.object().shape({
  titulo: Yup.string().required('El campo título es requerido'),
  descripcion: Yup.string().required('El campo descripción es requerido'),
  precio_estandar: Yup.number().required('El campo precio es requerido'),
  url: Yup.string().url().required('El campo tal URL requerido')
}).optional()