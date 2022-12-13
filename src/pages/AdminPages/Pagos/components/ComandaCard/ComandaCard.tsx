import React from 'react';
export interface ComandaCardInterface { }

const ComandaCard: React.FC<ComandaCardInterface> = () => {
	return (
		<div className='bg-white rounded-2'>
			<div className='px-3 py-2 d-flex justify-content-between row'>
				<h4 className='m-0 fs-6 text-success text-center col-3'>Mesa</h4>
				<h4 className='m-0 fs-6 text-primary text-center col-3'>Cliente</h4>
				<h4 className='m-0 fs-6 text-primary text-center col-3'>Mesero</h4>
				<h4 className='m-0 fs-6 text-success text-center col-3'>Total</h4>
			</div>
			<div className='px-3 py-4 bg-primary bg-opacity-25 d-flex justify-content-between row'>
				<h4 className='m-0 fs-6 text-center col-3'>1</h4>
				<h4 className='m-0 fs-6 text-center col-3'>Leo</h4>
				<h4 className='m-0 fs-6 text-center col-3'>David</h4>
				<h4 className='m-0 fs-6 text-center col-3'>S/. 120</h4>
			</div>
		</div>
	);
};

export default ComandaCard;
