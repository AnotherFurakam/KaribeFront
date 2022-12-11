import React, { useContext, useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import { Table } from "../../../components/Table";
import { LocalContext } from "../../../context/Locales/LocalProvider";
import CreateButton from "../../../global-styled-components/CreateButton";
import { Form } from "./components/Form";
export interface LocalesInterface {}

//* Definiendo columnas a mostrar
const colums = {
  telefono: "TELÉFONO",
  descripcion: "DESCRIPCIÓN",
  ruc: "RUC",
  departamento: "DEPARTAMENTO",
  provincia: "PROVINCIA",
  distrito: "DISTRITO",
};

const Locales: React.FC<LocalesInterface> = () => {
  const {
    locales,
    getAllLocales,
    getLocalById,
    deleteLocal,
    clearSelectedLocal,
  } = useContext(LocalContext);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCreateLocal = () => {
    setIsOpenModal(true);
  };

  const handleEditLocal = (id: number) => {
    //* Obtenemos el dato del producto por su id, y se seteara en el estado de selectedProducto
    getLocalById(id);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    clearSelectedLocal();
  };

  //! eliminar esta funcion
  const handleNavToOpcionProducto = () => {
    console.log("Arregla esta nota man");
  };

  useEffect(() => {
    //* Obteniendo todos los locales desde el contexto
    getAllLocales();

    //* Limpiamos el estado de selectedLocal
    clearSelectedLocal();

    //* Seteando título de la página
    document.title = "El Karibe - Locales";
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex gap-4 align-items-center">
          <h1 className="display-6 m-0">Locales</h1>
          <FaBox size={40} fill={"#FFA20D"} />
        </div>
        <div className="d-flex align-items-center">
          <CreateButton onClick={handleCreateLocal}>
            Agregar Local
            <MdAdd size={25} />
          </CreateButton>
        </div>
      </div>
      <Table
        data={locales}
        colums={colums}
        crudButtons
        customButton={false}
        customButtonTitle={""}
        customFunction={handleNavToOpcionProducto}
        editFunction={handleEditLocal}
        deleteFunction={deleteLocal}
      />
      <Modal isOpen={isOpenModal} handleCloseModal={handleCloseModal}>
        <Form titulo="Registrar Local" handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Locales;
