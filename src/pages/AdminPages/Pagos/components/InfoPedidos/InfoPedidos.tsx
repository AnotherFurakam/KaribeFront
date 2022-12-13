import React from 'react';
import { Table } from '../../../../../components/Table';
import SubmitButton from '../../../../../global-styled-components/forms/SubmitButton';
import InfoPedidoContainer from '../../styled-components/InfoPedidoContainer';
import InfoPedidosHeader from '../../styled-components/InfoPedidosHeader';
export interface InfoPedidosContainerInterface { }

const InfoPedidos: React.FC<InfoPedidosContainerInterface> = () => {

	const columns = {
		producto: 'PRODUCTO',
		tipo: 'TIPO',
		cantidad: 'CANTIDAD',
		precio_unidad: 'PRECIO UNIDAD',
		precio_total: 'PRECIO TOTAL'
	}

	return (
		<InfoPedidoContainer>
			<InfoPedidosHeader>
				<h1 className='m-0 text-light fs-3 fw-normal p-3'>Información del pedido</h1>
			</InfoPedidosHeader>
			<div className='d-flex flex-column'>
				<div className='d-flex mx-auto w-100 justify-content-around align-items-center my-3'>
					<div>
						<h3 className='m-0 fs-4'>Orden 1</h3>
					</div>
					<div>
						<label className='m-0'>Cliente:&nbsp;</label>
						<span className='m-0'>Leo Messi</span>
					</div>
					<div>
						<label className='m-0'>Mesero:&nbsp;</label>
						<span className='m-0'>David Saenz</span>
					</div>
				</div>
				<div className='px-4'>
					<Table
						colums={columns}
						data={[]}
					/>
				</div>
				<div className='d-flex justify-content-between my-3 px-5'>
					<div className='d-flex align-items-center gap-3'>
						<label className='m-0 fw-bold text-warning fs-3'>TOTAL:</label>
						<span className='m-0 fw-normal fs-4'>S/. 0.0</span>
					</div>
					<div>
						<SubmitButton>
							Cobrar
						</SubmitButton>
					</div>
				</div>
			</div>
		</InfoPedidoContainer>
	);
};

export default InfoPedidos;
