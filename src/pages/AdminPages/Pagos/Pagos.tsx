import React, { useEffect, useState } from 'react';
import { IComanda } from '../../../models/comanda.interface';
import comandasService from '../../../services/comandas.service';
import { ComandaCard } from './components/ComandaCard';
import { InfoPedidos } from './components/InfoPedidos';
import ComandasContainer from './styled-components/ComandasContainer';
import InfoPedidoContainer from './styled-components/InfoPedidoContainer';
export interface PagosInterface { }

const Pagos: React.FC<PagosInterface> = () => {

	const [comandas, setComandas] = useState<IComanda[]>([] as IComanda[])

	const [comanda, setComanda] = useState<IComanda | null>(null)

	const handleComandas = async () => {
		await comandasService.getAllComandasFinalizadas().then(res => {
			setComandas(res.payload)
		})
	}

	const handleIdComanda = (comanda: IComanda) => {
		setComanda(comanda)
	}

	useEffect(() => {
		handleComandas()
	}, [])


	return (
		<div className='row h-100'>
			{/* Comandas */}
			<ComandasContainer className="col-3">
				<h1 className='text-light fs-2 fw-normal mb-4'>Comandas</h1>
				<div className='d-flex flex-column gap-3'>
					{
						comandas?.map(c => <div key={c.id} onClick={() => handleIdComanda(c)}><ComandaCard comanda={c} /></div>)
					}
				</div>
			</ComandasContainer>

			{/* Información de pedido */}
			<div className="col-9">
				<InfoPedidos comanda={comanda} setComanda={setComanda} comandas={comandas} setComandas={setComandas} />
			</div>
		</div>
	);
};

export default Pagos;
