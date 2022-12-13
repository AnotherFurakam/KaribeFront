import React from 'react';
import { ComandaCard } from './components/ComandaCard';
import { InfoPedidos } from './components/InfoPedidos';
import ComandasContainer from './styled-components/ComandasContainer';
export interface PagosInterface { }

const Pagos: React.FC<PagosInterface> = () => {
	return (
		<div className='row h-100'>
			{/* Comandas */}
			<ComandasContainer className="col-3">
				<h1 className='text-light fs-2 fw-normal mb-4'>Comandas</h1>
				<div className='d-flex flex-column gap-3'>
					<ComandaCard />
					<ComandaCard />
					<ComandaCard />
					<ComandaCard />
				</div>
			</ComandasContainer>

			{/* Información de pedido */}
			<div className="col-9">
				<InfoPedidos />
			</div>
		</div>
	);
};

export default Pagos;
