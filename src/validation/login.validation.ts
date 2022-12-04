import * as Yup from "yup";
import LoginForm from "../models/loginform.interface";

export const LoginSchema: Yup.SchemaOf<LoginForm> = Yup.object({
  usuario: Yup.string().required("El campo usuario es requerido!"),
  password: Yup.string().required("El campo contraseña es requerido!")
})
