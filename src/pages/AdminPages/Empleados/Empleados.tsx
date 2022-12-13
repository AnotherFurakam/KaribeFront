import React, { useContext, useEffect, useState } from 'react';

//Styled components
import CreateButton from '../Productos/styled-component/CreateButton';

//Incons
import { HiUserGroup } from "react-icons/hi";
import { MdAdd } from 'react-icons/md';
import { Table } from '../../../components/Table';
import { EmpleadoContext } from '../../../context/Empleado/EmpleadoProvider';
import { Modal } from '../../../components/Modal';
import { EmpleadoForm } from './components/EmpleadoForm';


export interface EmpleadosInterface { }

const Empleados: React.FC<EmpleadosInterface> = () => {

	//* Context
	const {
		empleados,
		getAllEmpleados,
		setSelectedEmpleado,
		clearSelectedEmpleado,
		deleteEmpleado
	} = useContext(EmpleadoContext)

	//* Estado para almacenar la data personalizada
	const [data, setData] = useState<any>(null)

	//* Personalizando la data de empleados, y ajustando a los valores solicitados en las columnas del diseño
	const d = empleados?.map(e => {
		return {
			id: e.id,
			nombre: e.nombre,
			apellidos: e.ape_paterno + ' ' + e.ape_materno,
			documento: e.documento,
			fecha_nacimiento: e.fecha_nacimiento.split("T")[0].replace("-", "/").replace("-", "/"),
			telefono: e.telefono,
			rol: e.rol?.titulo
		}
	}) ?? null

	//* Open modal state
	const [isOpennedModal, setisOpennedModal] = useState(false)

	const handleOpenModal = () => {
		setisOpennedModal(true)
	}

	const handleCloseModal = () => {
		setisOpennedModal(false)
		clearSelectedEmpleado()
	}

	const handleEditFunction = (idEmpleado: number) => {
		handleOpenModal()
		setSelectedEmpleado(idEmpleado)
	}

	const colums = {
		nombre: 'NOMBRES',
		apellidos: 'APELLIDOS',
		documento: 'DOCUMENTO',
		fecha_nacimiento: 'FECHA N.',
		telefono: 'TELEFONO',
		rol: 'ROL'
	}

	//* Obteniendo empleados solo cuando data sea null
	useEffect(() => {
		if (data === null) {
			getAllEmpleados()
		}
		setData(d)

		//* Escuchando cambios de empleados
	}, [empleados])


	return (
		<>
			<div className='d-flex justify-content-between mb-4'>
				<div className='d-flex gap-3 align-items-center'>
					<h1 className='display-6 m-0'>Empleados</h1>
					<HiUserGroup color='#FFA20D' size={40} />
				</div>
				<div className='d-flex align-items-center'>
					<CreateButton onClick={handleOpenModal}>
						Agregar empleado
						<MdAdd size={25} />
					</CreateButton>
				</div>
			</div>
			<Table
				colums={colums}
				data={data}
				editFunction={handleEditFunction}
				deleteFunction={deleteEmpleado}
			/>
			<Modal
				isOpen={isOpennedModal}
				handleCloseModal={handleCloseModal}
			>
				<EmpleadoForm handleCloseModal={handleCloseModal} />
			</Modal>
		</>
	);
};

export default Empleados;
