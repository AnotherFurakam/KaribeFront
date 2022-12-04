import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalContainer from '../../global-styled-components/GlobalContainer';
import PageContainer from '../../global-styled-components/PageContainer';
import { Navbar } from '../Navbar';
import { SideBar } from '../SideBar';
export interface AdminOutletInterface {
}

const AdminOutlet: React.FC<AdminOutletInterface> = () => {
	
	return (
		<div className='d-flex'>
			<SideBar />
			<PageContainer>
				<Navbar />
				<GlobalContainer>
					<Outlet />
				</GlobalContainer>
			</PageContainer>
		</div>
	);
};

export default AdminOutlet;
