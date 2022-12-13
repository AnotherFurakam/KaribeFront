import * as Yup from "yup";
import { IEmpleado } from "../models/empleado.interface";

export const EmpleadoShchema: Yup.SchemaOf<IEmpleado> = Yup.object().shape({
  nombre: Yup
    .string()
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+[a-z A-Z]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]$/, 'Solo se permite texto')
    .min(0)
    .max(50)
    .required("Se requiere el campo nombre"),
  ape_paterno: Yup
    .string()
    .required("Se requiere el campo apellido paterno"),
  ape_materno: Yup
    .string()
    .required("Se requiere el campo apellido materno"),
  documento: Yup
    .string()
    .min(8, 'El número debe tener mínimo 8 dígitos')
    .max(8, 'El número debe tener máximo 8 dígitos')
    .matches(/^[0-9]{8,8}$/, 'Solo se permite números')
    .required("Se requiere el campo DNI"),
  genero: Yup
    .string()
    .required("Debe escoger un género"),
  fecha_nacimiento: Yup
    .string()
    .required("Se requiere la fecha de nacimiento"),
  telefono: Yup
    .string()
    .min(9, 'El número debe tener mínimo 9 dígitos')
    .max(9, 'El número debe tener máximo 9 dígitos')
    .matches(/^[9][0-9]{8,8}$/, 'Formato de número incorrecto')
    .required("Se requiere el campo teléfono"),
  correo: Yup
    .string()
    .email()
    .required("Se requiere el correo electrónico"),
  rol_id: Yup
    .number()
    .min(1, 'Debe escoger su rol')
    .required(),
  local_id: Yup
    .number()
    .min(1, 'Debe escoger su local')
    .required()
}).optional()