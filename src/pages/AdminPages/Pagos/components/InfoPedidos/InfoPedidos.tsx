import React, { useEffect, useState } from 'react';
import Table from '../../../../../components/Table/styled-component/Table';
import TableBody from '../../../../../components/Table/styled-component/TableBody';
import TableHead from '../../../../../components/Table/styled-component/TableHead';
import SubmitButton from '../../../../../global-styled-components/forms/SubmitButton';
import { IComanda } from '../../../../../models/comanda.interface';
import comandasService from '../../../../../services/comandas.service';
import InfoPedidoContainer from '../../styled-components/InfoPedidoContainer';
import InfoPedidosHeader from '../../styled-components/InfoPedidosHeader';
export interface InfoPedidosContainerInterface {
	comanda: IComanda | null,
	setComanda: (comanda: IComanda | null) => void
	comandas: IComanda[] | null,
	setComandas: (comandas: IComanda[]) => void
}

const InfoPedidos: React.FC<InfoPedidosContainerInterface> = ({ comanda, setComanda, comandas, setComandas }) => {


	const columns = {
		producto: 'PRODUCTO',
		cantidad: 'CANTIDAD',
		precio_unidad: 'PRECIO UNIDAD',
		precio_total: 'PRECIO TOTAL'
	}

	const handlePago = async (idComanda: number) => {
		await comandasService.pagar(idComanda)
		const filteredArray = comandas?.filter(c => c.id !== idComanda) as IComanda[]
		setComandas(filteredArray)
		setComanda(null)
	}


	return (
		<InfoPedidoContainer className='d-flex flex-column'>
			<InfoPedidosHeader>
				<h1 className='m-0 text-light fs-3 fw-normal p-3'>Información del pedido</h1>
			</InfoPedidosHeader>
			<div className='d-flex flex-column h-100'>
				<div className='d-flex mx-auto w-100 justify-content-around align-items-center my-3'>
					<div>
						<h3 className='m-0 fs-4'>Orden {comanda?.orden.id}</h3>
					</div>
					<div className='d-flex align-items-center gap-3'>
						<label className='m-0'>Cliente:</label>
						<span className='m-0'>{comanda?.cliente}</span>
					</div>
					<div className='d-flex align-items-center gap-3'>
						<label className='m-0'>Mesero:</label>
						<span className='m-0'>{comanda?.empleado.nombre}</span>
					</div>
				</div>
				<div className='px-4 h-100'>
					<Table>
						<TableHead>
							<tr>
								{
									columns &&
									Object.values(columns).map((column: any, index) =>
										<th key={index}>{column}</th>)
								}
							</tr>
						</TableHead>
						<TableBody>
							{
								comanda?.orden.Detalle_orden.map(c => {
									return (
										<tr key={c.id}>
											<td>{c.opproducto_local.opcion.titulo}</td>
											<td>{c.cantidad}</td>
											<td>{c.precio}</td>
											<td>{c.precio_total}</td>
										</tr>
									)
								})
							}
						</TableBody>
					</Table>
				</div>
				<div className='d-flex justify-content-between my-3 px-5'>
					<div className='d-flex align-items-center gap-3'>
						<label className='m-0 fw-bold text-warning fs-3'>TOTAL:</label>
						<span className='m-0 fw-normal fs-4'>{comanda?.orden.precio_total}</span>
					</div>
					<div>
						<SubmitButton onClick={() => handlePago(comanda?.id as number)}>
							Finalizar
						</SubmitButton>
					</div>
				</div>
			</div>
		</InfoPedidoContainer>
	);
};

export default InfoPedidos;
