import React from 'react';
import { Image } from 'react-bootstrap';
import SidebarContainer from './styled-component/SidebarContainer';
import LogoKaribe from "/src/assets/img/LogoKaribe.svg";
import { AiFillDollarCircle, AiFillHome, AiOutlineHistory, AiFillFile, AiFillShop } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiBarChart2Fill } from "react-icons/ri";
import SideLink from './styled-component/SideLink';
import { FaBox } from 'react-icons/fa';
export interface SideBarInterface { }

const SideBar: React.FC<SideBarInterface> = () => {
	return (
		<SidebarContainer>
			<div className='row py-3 gap-5'>
				<div className="d-flex gap-2">
					<Image src={LogoKaribe} />
					<div className="d-flex flex-column justify-content-center">
						<h3 className="m-0 text-decoration-underline text-light">El Karible</h3>
						<p className="m-0 text-info">Picantería</p>
					</div>
				</div>
				<div className='d-flex flex-column gap-4'>
					<SideLink to={'/admin/inicio'} className='text-decoration-none' >
							<AiFillHome size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Inicio</p>
					</SideLink>
					<SideLink to={'/admin/locales'} className='text-decoration-none' >
							<AiFillShop size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Locales</p>
					</SideLink>
					<SideLink to={'/admin/empleados'} className='text-decoration-none' >
							<BsFillPeopleFill size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Empleados</p>
					</SideLink>
					<SideLink to={'/admin/productos'} className='text-decoration-none' >
							<FaBox size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Productos</p>
					</SideLink>
					<SideLink to={'/admin/pagos'} className='text-decoration-none' >
							<AiFillDollarCircle size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Pagos</p>
					</SideLink>
					<SideLink to={'/admin/historial'} className='text-decoration-none' >
							<AiOutlineHistory size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Historial</p>
					</SideLink>
					<SideLink to={'/admin/reportes'} className='text-decoration-none' >
							<AiFillFile size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Reportes</p>
					</SideLink>
					<SideLink to={'/admin/estadisticas'} className='text-decoration-none' >
							<RiBarChart2Fill size={25} fill={'#fff'} />
							<p className='m-0 fs-5 text-light'>Estadísticas</p>
					</SideLink>
				</div>
			</div>
		</SidebarContainer>
	);
};

export default SideBar;
