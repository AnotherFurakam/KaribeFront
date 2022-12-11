import React, { useContext } from "react";
import Swal from "sweetalert2";
import { LocalContext } from "../../../../context/Locales/LocalProvider";
import { ILocal } from "../../../../models/local.interface";

export interface FormInterface {
  titulo: string;
  handleCloseModal: () => void;
}

export const Form: React.FC<FormInterface> = ({ titulo, handleCloseModal }) => {
  const { postLocal, putLocal, selectedLocal } = useContext(LocalContext);

  const initialValues: ILocal = {
    telefono: selectedLocal?.telefono ?? "",
    descripcion: selectedLocal?.descripcion ?? "",
    ruc: selectedLocal?.ruc ?? "",
    departamento: selectedLocal?.departamento ?? "",
    provincia: selectedLocal?.provincia ?? "",
    distrito: selectedLocal?.distrito ?? "",
  };

  return (
    <>
      <div>Form</div>
      <h2>Data de Formulario</h2>
    </>
  );
};
