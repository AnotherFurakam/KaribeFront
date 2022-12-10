import React, { useContext, useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../components/Modal';
import { Table } from '../../../components/Table';
import { ProductoContext } from '../../../context/Producto/ProductoProvider';
import { ProductForm } from './components/ProductForm';
import CreateButton from './styled-component/CreateButton';

export interface ProductosInterface { }

const Productos: React.FC<ProductosInterface> = () => {

	const navigation = useNavigate()

	const { productos, getAllProductos, getProductoById, clearSelectedProducto, deleteProducto } = useContext(ProductoContext)

	const [isOpenModal, setIsOpenModal] = useState(false)

	const handleCreateProduct = () => {
		setIsOpenModal(true)
	}

	const handleEditProduct = (id: number) => {
		//* Obtenemos el dato del producto por su id, y se seteara en el estado de selectedProducto
		getProductoById(id)
		setIsOpenModal(true)
	}

	const handleCloseModal = () => {
		//* Cerrando el modal
		setIsOpenModal(false)

		//* Limpiando el estado de producto seleccionado para que a la hora de abrir el formulario de
		//* registro no nos salgan los datos del producto seleccionado (ya que se quiere que este se vea cuando
		//* se habra el modal para actualizar dicho producto)
		clearSelectedProducto()
	}

	const handleNavToOpcionProducto = (idProducto: number) => {
		navigation('/admin/productos/' + idProducto)
	}



	//* Definiendo columnas a mostrar
	const colums = {
		titulo: "NOMBRE",
		descripcion: "DESCRIPCIÓN",
		de_cocina: "DE COCINA",
	}

	useEffect(() => {
		//* Obteniendo todos los productos desde el contexto
		getAllProductos()

		//* Limpiamos el estado de selctedProducto
		clearSelectedProducto()

		//* Seteando título de la págino
		document.title = 'El Karibe - Productos'
	}, [])

	return (
		<>
			<div className='d-flex justify-content-between mb-4'>
				<div className='d-flex gap-4 align-items-center'>
					<h1 className='display-6 m-0'>Productos</h1>
					<FaBox size={40} fill={'#FFA20D'} />
				</div>
				<div className='d-flex align-items-center'>
					<CreateButton onClick={handleCreateProduct}>
						Agregar producto
						<MdAdd size={25} />
					</CreateButton>
				</div>
			</div>
			<Table
				data={productos}
				colums={colums}
				crudButtons
				customButton
				customButtonTitle={'Opciones de producto'}
				customFunction={handleNavToOpcionProducto}
				deleteFunction={deleteProducto}
				editFunction={handleEditProduct}
			/>
			<Modal
				isOpen={isOpenModal}
				handleCloseModal={handleCloseModal}
			>
				<ProductForm
					titulo='Registrar producto'
					handleCloseModal={handleCloseModal}
				/>
			</Modal>
		</>
	);
};

export default Productos;
