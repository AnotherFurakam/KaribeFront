import * as Yup from "yup";
import { ILocal } from "../models/local.interface";

export const LocalFormSchema: Yup.SchemaOf<ILocal> = Yup.object()
  .shape({
    telefono: Yup.number()
      .typeError("Deben ser Números")
      .required("Debe llenar el campo teléfono"),
    descripcion: Yup.string()
      .max(500, "Solo se permite hasta 500 caracteres")
      .required("Debe llenar el campo descripción"),
    ruc: Yup.number()
      .typeError("Deben ser Números")
      .required("Debe llenar el campo ruc"),
    departamento: Yup.string().required("Debe llenar el campo departamento"),
    provincia: Yup.string().required("Debe llenar el campo provincia"),
    distrito: Yup.string().required("Debe llenar el campo distrito"),
  })
  .optional();
