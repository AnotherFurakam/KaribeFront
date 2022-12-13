import React from 'react';
import { IComanda } from '../../../../../models/comanda.interface';
export interface ComandaCardInterface {
	comanda: IComanda
}

const ComandaCard: React.FC<ComandaCardInterface> = ({comanda}: ComandaCardInterface) => {
	return (
		<div className='bg-white rounded-2'>
			<div className='px-3 py-2 d-flex justify-content-between row'>
				<h4 className='m-0 fs-6 text-success text-center col-3'>Mesa</h4>
				<h4 className='m-0 fs-6 text-primary text-center col-3'>Cliente</h4>
				<h4 className='m-0 fs-6 text-primary text-center col-3'>Mesero</h4>
				<h4 className='m-0 fs-6 text-success text-center col-3'>Total</h4>
			</div>
			<div className='px-3 py-4 bg-primary bg-opacity-25 d-flex justify-content-between row'>
				<h4 className='m-0 fs-6 text-center col-3'>{comanda.mesa.nro_mesa}</h4>
				<h4 className='m-0 fs-6 text-center col-3'>{comanda.cliente}</h4>
				<h4 className='m-0 fs-6 text-center col-3'>{comanda.empleado.nombre}</h4>
				<h4 className='m-0 fs-6 text-center col-3'>{comanda.orden.precio_total}</h4>
			</div>
		</div>
	);
};

export default ComandaCard;
