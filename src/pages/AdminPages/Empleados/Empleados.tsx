import React from 'react';

//Styled components
import CreateButton from '../Productos/styled-component/CreateButton';

//Incons
import { HiUserGroup } from "react-icons/hi";
import { MdAdd } from 'react-icons/md';
import { Table } from '../../../components/Table';


export interface EmpleadosInterface { }

const Empleados: React.FC<EmpleadosInterface> = () => {

	const colums = {

	}

	return (
		<>
			<div className='d-flex justify-content-between mb-4'>
				<div className='d-flex gap-3 align-items-center'>
					<h1 className='display-6 m-0'>Empleados</h1>
					<HiUserGroup color='#FFA20D' size={40} />
				</div>
				<div className='d-flex align-items-center'>
					<CreateButton onClick={()=>{}}>
						Agregar empleado
						<MdAdd size={25} />
					</CreateButton>
				</div>
			</div>

		</>
	);
};

export default Empleados;
