import * as Yup from "yup";
import { IProducto } from "../models/producto.interface";

export const ProductoFormSchema: Yup.SchemaOf<IProducto> = Yup.object().shape({
  titulo: Yup.string().required("Debe llenar el campo título"),
  descripcion: Yup.string().max(500,"Solo se permite hasta 500 caracteres").required("Debe llenar el campo descripción"),
  de_cocina: Yup.boolean().required("Debe seleccionar una opción"),
  url: Yup.string().url("Debe ingresar una URL").required("Debe llenar el campo URL")
}).optional()