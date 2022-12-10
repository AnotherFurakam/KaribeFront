import React, { useContext, useEffect, useState } from 'react';
import { MdAdd, MdArrowBackIosNew, MdDinnerDining } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../../components/Modal';
import { Table } from '../../../components/Table';
import { ProductoContext } from '../../../context/Producto/ProductoProvider';
import { IOpcionProducto } from '../../../models/opcion_producto.interface';
import CreateButton from '../Productos/styled-component/CreateButton';
import { OpcionProductoForm } from './components/OpcionProductoForm';
import BackButton from './styled-component/BackButton';
export interface OpcionProductoInterface { }

const OpcionProducto: React.FC<OpcionProductoInterface> = () => {

	const navigate = useNavigate()

	const { selectedProducto, getProductoById, getOpcionProductoById, clearSelectedOpcionProducto, deleteOpcionProductoById } = useContext(ProductoContext)

	const [isOpenModal, setIsOpenModal] = useState(false)

	const handleCloseModal = () => {
		setIsOpenModal(false)
		clearSelectedOpcionProducto()
	}

	const handleOpenModal = () => {
		setIsOpenModal(true)
	}

	const handleEdit = (id: number) => {
		setIsOpenModal(true)
		getOpcionProductoById(id)
	}

	const { id } = useParams()

	const columns = {
		titulo: 'TITULO',
		descripcion: 'DESCRIPCIÓN',
		precio_estandar: 'PRECIO'
	}



	useEffect(() => {
		getProductoById(Number(id))
	}, [])

	return (
		<>
			<div className='d-flex justify-content-between mb-4'>
				<div className='d-flex gap-4 align-items-center'>
					<BackButton type='button' onClick={() => navigate('/admin/productos')}>
						<MdArrowBackIosNew color='#fff' size={25} />
					</BackButton>
					<h1 className='display-6 m-0'>{selectedProducto?.titulo}</h1>
					<MdDinnerDining size={45} fill={'#FFA20D'} />
				</div>
				<div className='d-flex align-items-center'>
					<CreateButton onClick={handleOpenModal}>
						Agregar producto
						<MdAdd size={25} />
					</CreateButton>
				</div>
			</div>
			<div>
				<Table
					colums={columns}
					crudButtons
					customButton={false}
					customButtonTitle={'none'}
					data={selectedProducto?.opcion as Array<IOpcionProducto>}
					customFunction={() => { }}
					deleteFunction={deleteOpcionProductoById}
					editFunction={handleEdit}
				/>
			</div>
			<Modal
				isOpen={isOpenModal}
				handleCloseModal={handleCloseModal}
			>
				<OpcionProductoForm
					titulo='Registrar opción de producto'
					handleCloseModal={handleCloseModal}
				/>
			</Modal>
		</>
	);
};

export default OpcionProducto;
