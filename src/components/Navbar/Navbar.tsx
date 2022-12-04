import React from 'react';
import { Container } from 'react-bootstrap';
import { FaBell } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import BellBadge from './styled-component/BellBadge';
import NavContainer from './styled-component/NavContainer';
import PathTitle from './styled-component/PathTitle';
import UserImage from './styled-component/UserImage';

export interface NavbarInterface { }

const Navbar: React.FC<NavbarInterface> = () => {
	const locate = useLocation()
	return (
		<NavContainer>
			<Container className='mx-5' fluid>
				<div className='d-flex justify-content-between'>
					<div className='d-flex align-items-center'>
						<PathTitle className='m-0'>${locate.pathname.split('/')[2]?.toUpperCase()??''}</PathTitle>
					</div>
					<div className='d-flex align-items-center gap-5'>
						<BellBadge>
							<FaBell size={30} color={'#fff'} />
							<span>
								99+
							</span>
						</BellBadge>
						<div className='d-flex align-items-center gap-4'>
							<p className='m-0 fs-6 fw-normal text-light'>Nombre de usuario</p>
							<UserImage src='https://ionicframework.com/docs/img/demos/avatar.svg' className='rounded-circle bg-black' />
						</div>
					</div>
				</div>
			</Container>
		</NavContainer>
	);
};

export default Navbar;
