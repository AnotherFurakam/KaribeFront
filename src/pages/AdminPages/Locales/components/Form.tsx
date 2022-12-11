import { Formik, FormikHelpers, FormikProps } from "formik";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { LocalContext } from "../../../../context/Locales/LocalProvider";
import FormErrorMessage from "../../../../global-styled-components/forms/FormErrorMessage";
import InputText from "../../../../global-styled-components/forms/InputText";
import SubmitButton from "../../../../global-styled-components/forms/SubmitButton";
import { ILocal } from "../../../../models/local.interface";
import { LocalFormSchema } from "../../../../validation/local.validation";
import FormStyled from "../../Productos/styled-component/FomStyled";

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

  const handleSubmit = async (
    values: ILocal,
    helpers: FormikHelpers<ILocal>
  ) => {
    console.log("Hola como estas");
    console.log(values);

    if (!selectedLocal) {
      await postLocal(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          Swal.fire({
            text: "Local registrado con éxito",
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: err.message,
            icon: "error",
          });
        });
    } else {
      await putLocal(selectedLocal.id as number, values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          Swal.fire({
            text: "Local actualizado con éxito",
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: err.message,
            icon: "error",
          });
        });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LocalFormSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleChange,
      }: FormikProps<ILocal>) => (
        <FormStyled className="d-flex flex-column gap-4">
          <h1 className="display-5 text-muted">{titulo}</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <InputText type="tel" name="telefono" placeholder="telefono" />
                <FormErrorMessage name="telefono" component={"p"} />
              </div>
              <div className="mb-3">
                <InputText type="text" name="ruc" placeholder="ruc" />
                <FormErrorMessage name="ruc" component={"p"} />
              </div>
              <div className="mb-3">
                {/*  
									//* Solo para el text area le definimos el value, ya que sin eso no toma el valor del selectedProducto
									*/}
                <InputText
                  name="descripcion"
                  id="descripcion"
                  as="textarea"
                  value={values.descripcion}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Descripción"
                />
                <FormErrorMessage name="descripcion" component={"p"} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <InputText
                  type="text"
                  name="departamento"
                  placeholder="departamento"
                />
                <FormErrorMessage name="departamento" component={"p"} />
              </div>
              <div className="mb-3">
                <InputText
                  type="text"
                  name="provincia"
                  placeholder="provincia"
                />
                <FormErrorMessage name="provincia" component={"p"} />
              </div>
              <div className="mb-3">
                <InputText type="text" name="distrito" placeholder="distrito" />
                <FormErrorMessage name="distrito" component={"p"} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <SubmitButton type="submit" disabled={isSubmitting}>
              Registrar
            </SubmitButton>
          </div>
        </FormStyled>
      )}
    </Formik>
  );
};
