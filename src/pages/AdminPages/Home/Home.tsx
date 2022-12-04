import React, { useEffect } from 'react';
import { Table } from '../../../components/Table';
export interface HomeInterface { }

const Home: React.FC<HomeInterface> = () => {

	
	//* Columnas a mostrar
	const columns = {
		nombre: 'NOMBRE',
		url: 'URL',
		deCocina: 'DE COCINA'
	}

	//* La data
	const data = [
		{
			id: 'adc',
			nombre: 'Inka Kola',
			url: 'https://karibe.app/incakola.png',
			deCocina: false
		},
		{
			id: 'oeu',
			nombre: 'Inka Kola',
			url: 'https://karibe.app/incakola.png',
			deCocina: false
		},
		{
			id: 'ueo',
			nombre: 'Inka Kola',
			url: 'https://karibe.app/incakola.png',
			deCocina: false
		}
	]

	//*Funciones que pasaremos a la tabla
	const handleEdit = (id: any) => {
		console.log('Editando '+id)
	}
	const handleDelete = (id: any) => {
		console.log('Eliminando '+id)
	}
	const customFunction = (id: any) => {
		console.log('Acción custom '+id)
	}

	useEffect(() => {
		//*Seteando título de documento
		document.title = "El Karibe - Home"
	}, [])
	
	return (
		<div>
		<h1>Home</h1>
		<Table 
			data={data} 
			colums={columns} 
			crudButtons 
			customButton={true} 
			customButtonTitle={"Acción adicional"} 
			editFunction={handleEdit}
			deleteFunction={handleDelete}
			customFunction={customFunction}
		/>
		</div>
	);
};

export default Home;
