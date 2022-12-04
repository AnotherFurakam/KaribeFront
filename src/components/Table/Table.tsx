import React from 'react';
import TableContainer from './styled-component/TableContainer';
import TableHead from './styled-component/TableHead';
import Tabule from './styled-component/Table';
import TableBody from './styled-component/TableBody';
import TableActionButton from './styled-component/TableActionButton';
import { MdEdit } from "react-icons/md";
import { BsXLg } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';
export interface TableInterface {
	colums: any,
	data: any[],
	crudButtons: boolean,
	customButton: boolean,
	customButtonTitle: string,
	editFunction: (id: any) => void,
	deleteFunction: (id: any) => void,
	customFunction: (id: any) => void,
}

const Table: React.FC<TableInterface> = (
	{
		colums,
		data,
		crudButtons = true,
		customButton = false,
		customButtonTitle = 'Título del botón',
		editFunction,
		deleteFunction,
		customFunction
	}
) => {

	const handleEdit = (id: any) => {
		editFunction(id)
	}

	const handleDelete = (id: any) => {
		deleteFunction(id)
	}

	const handleCustomAction = (id: any) => {
		customFunction(id)
	}


	return (
		<TableContainer>
			<Tabule>
				<TableHead>
					<tr>
						{
							colums &&
							Object.values(colums).map((column: any, index) =>
								<th key={index}>{column}</th>)
						}
						<th>OPCIONES</th>
					</tr>
				</TableHead>
				<TableBody>
					{
						data && data.map(d => {
							return (
								<tr key={Object.values<any>(d)[0]}>
									{
										Object.keys(d).map((k, i) => {
											return Object.keys(colums).find(nc => nc === k) &&
												<td key={i}><p className='m-0 mt-2 text-truncate'>{
													typeof (Object.values<any>(d)[i]) === 'boolean'
														? Object.values<any>(d)[i] === true ? 'SI' : 'No'
														: Object.values<any>(d)[i]
												}</p></td>
										}
										)
									}
									<td className='d-flex justify-content-center gap-2'>
										{
											crudButtons && (
												<>
													<TableActionButton type='button' color='#4ECB71' onClick={() => handleEdit(Object.values<any>(d)[0])}>
														<MdEdit color='#fff' size={30} />
													</TableActionButton>
													<TableActionButton type='button' color='#BD144B' onClick={() => handleDelete(Object.values<any>(d)[0])}>
														<BsXLg color='#fff' size={30} />
													</TableActionButton>
												</>
											)
										}
										{
											customButton && (
												<TableActionButton type='button' color='#246fff' onClick={() => handleCustomAction(Object.values<any>(d)[0])}>
													<span>{customButtonTitle}</span>
													<FaCog color='#fff' size={30} />
												</TableActionButton>
											)
										}
									</td>

								</tr>
							)
						})
					}
				</TableBody>
			</Tabule>
		</TableContainer>
	);
};

export default Table;
